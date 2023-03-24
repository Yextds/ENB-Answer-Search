import * as React from "react";
import { SvgIcons } from "../../SvgIcon";
// import Footeraccordian from "./Footeraccordian";
// import Scroll from "./Scroll"

type props = {
  houseLender?: any;
  office?: any;
};

export default function Footer(data: props) {
  // Variables for House Lending Sections
  const houseLenderData = data.houseLender;
  const houseLenderHeading = houseLenderData.heading;
  const houseLenderCopyrightText = houseLenderData.copyrightText;
  const houseLenderSubMenus = houseLenderData.otherMenus.map((res: any) => {
    return (
      <>
        <a href={res.lendingLink}>{res.lendingLabel} | </a>
      </>
    );
  });
  // Variables for House Lending Sections
  // Variables for Office data
  const officeData = data.office;
  const officeHeading = officeData.heading;
  const officeLocation = officeData.address;
  const officeNumber = officeData.phoneNumber;

  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1023px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery: any) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <footer id="footer" className="footer-section">
        <div className="container-custom mobile-pad">
          <div className="flex flex-col lg:block">
            <div className="legal mt-10 lg:mt-0 order-3">
              <img
                src="https://www.epnb.com/wp-content/themes/epnb/img/logo/equal-housing-lender.svg"
                height={"70"}
                width={"70"}
              />
              <h3>{houseLenderHeading}</h3>
              <div className="footer-nav-links">
                <nav>
                  <ul>
                    <li>{houseLenderSubMenus}</li>
                  </ul>
                </nav>
              </div>
              <p>{houseLenderCopyrightText}</p>
            </div>
            <div className="corporate mt-10 lg:mt-0 order-2">
              <a href="javascript:void(0)" className="corporate-logo">
                <img
                  src="https://www.epnb.com/wp-content/themes/epnb/img/logo/logo-without-tagline.svg"
                  height={"70"}
                  width={"150"}
                />
              </a>
              <div className="corporate-address">
                <div className="corporate-location-name">{officeHeading}</div>
                <div className="corporate-location-address">
                  {officeLocation}
                </div>
                <div className="corporate-location-phone">
                  <span>Toll Free :</span>
                  <a href={"tel:" + officeNumber}>{officeNumber}</a>
                </div>
              </div>
            </div>
            <div className="social order-1">
              <h6 className="social-headline">
                Connect with us
              </h6>
              <div className="flex justify-center lg:justify-end">
                <ul className="flex items-center gap-5">
                  <li>
                    <a target="_blank" href="#">
                      {SvgIcons.faceBook}
                    </a>
                  </li>

                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className=""
                    >
                     {SvgIcons.twitter}
                    </a>
                  </li>

                  <li>
                    <a target="_blank" href="#" className=" text-gray-600">
                    {SvgIcons.linkedin}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className=""
                    >
                       {SvgIcons.instagram}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className=""
                    >
                       {SvgIcons.youTube}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="#"
                      className=""
                    >
                       {SvgIcons.pinterest}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container-custom mobile-pad">
          <div className="powered-by-title">
            <a href="javascript:void(0)">Site by Scheffey</a>
            <a href="javascript:void(0)">{SvgIcons.scheffeyLogo}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
