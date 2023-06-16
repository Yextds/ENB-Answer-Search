import * as React from "react";
import { SvgIcons } from "../../SvgIcon";
import { formatPhoneNumber } from "react-phone-number-input";
import { socialLinks } from "../../config/universalResultsConfig";

type props = {
  footerHeading?: any;
  footerlinks?: any;
  CopyrightText?: any;
  FooterLabel?: any;
  FooterAddress?: any;
  number?: any;
  
};

export default function Footer(data: props) {
 
  
  const houseLenderHeading = data.footerHeading;
  const houseLenderCopyrightText = data.CopyrightText;
  const houseLenderSubMenus = data.footerlinks.map((res: any) => {
    return (
      <>
        <li><a href={res.link}>{res.name}</a></li>
      </>
    );
  });
 
 
  const officeHeading = data.FooterLabel;
  const officeLocation = data.FooterAddress;
  const officeNumber = data.number;

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
                alt="footer"
              />
              <h3>{houseLenderHeading}</h3>
              <div className="footer-nav-links">
                <nav>
                  <ul>
                    {houseLenderSubMenus}
                  </ul>
                </nav>
              </div>
              <p>{houseLenderCopyrightText}</p>
            </div>
            <div className="corporate mt-10 lg:mt-0 order-2">
              <a href="https://www.epnb.com/" aria-label="tagline image" className="corporate-logo">
                <img
                  src="https://www.epnb.com/wp-content/themes/epnb/img/logo/logo-without-tagline.svg"
                  height={"70"}
                  width={"150"}
                  alt="footer"
                />
              </a>
              <div className="corporate-address">
                <div className="corporate-location-name">{officeHeading}</div>
                <div className="corporate-location-address">
                  {officeLocation}
                </div>
                <div className="corporate-location-phone">
                  <span>Toll Free :</span>
                  <a href={"tel:" + "+8787366532"}>{officeNumber}</a>
                </div>
              </div>
            </div>
            <div className="social order-1">
              <h4 className="social-headline">
                Connect with us!
              </h4>
              <div className="flex justify-center lg:justify-end">
                <ul className="flex items-center">
                  <li>
                    <a target="_blank" aria-label="facebook image" href={socialLinks.facebook}>
                      {SvgIcons.faceBook}
                    </a>
                  </li>

                  <li>
                    <a
                      aria-label="twitter image"
                      target="_blank"
                      href={socialLinks.twitter}
                    >
                     {SvgIcons.twitter}
                    </a>
                  </li>

                  <li>
                    <a aria-label="linkedin image" target="_blank" href={socialLinks.linkedin} className=" text-gray-600">
                    {SvgIcons.linkedin}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={socialLinks.instagram}
                      aria-label="instagram image"
                    >
                       {SvgIcons.instagram}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={socialLinks.youtube}
                      aria-label="youtube image"
                    >
                       {SvgIcons.youTube}
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={socialLinks.pinterest}
                      aria-label="pinterest image"
                    >{SvgIcons.pinterest}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container-custom mobile-pad">
          <div className="powered-by-title">
            <a  href="https://www.scheffey.com/">Site by Scheffey</a>
            <a aria-label="scheffy logo" href="https://www.scheffey.com/">{SvgIcons.scheffeyLogo}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
