import * as React from "react";
import { SvgIcons } from "../../SvgIcon";

type props = {
  upperHeaderLinks: any;
  lowerHeaderLinks: any;
};
/**
 * Component for Header
 * @param headerItem
 * @returns HTML element
 */
export default function Header(data: props) {
  const upperLinks = data.upperHeaderLinks;
  const lowerLinks = data.lowerHeaderLinks;
  const [open, setOpen] = React.useState("");

  

  const handleOnClick = () => {    
    if(open != "open"){
        setOpen("open");        
    }else{
        setOpen("");
    }
  }
  const upperHeaderLabels = upperLinks
    ? upperLinks.map((res: any) => {
        // console.log(res.label,"headerLinks");
        return (
          <>
            <li> {/* Top Bar navigation List Item */}
              <a
                href={res.link}
                className="course-accordion"
                rel="noopener noreferrer"
              >
                {res.label}
              </a>
            </li> {/* Top Bar navigation List Item */}
          </>
        );
      })
    : "Site data not found";

  const lowerHeaderLabels = lowerLinks
    ? lowerLinks.map((res: any) => {
        return (
          <>
            <li> {/* Primary navigation List Item */}
              <a
                href={res.link}
                className="course-accordion"
                rel="noopener noreferrer"
              >
                {res.label}
              </a>
            </li> {/* Primary navigation List Item */}
          </>
        );
      })
    : null;

  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  });
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle(
      "menu-opened"
    );
  };

  return (
    <>      
      <div className="header" id="header"> {/* Header */}
        <div className="labelLinks top-bar hidden lg:block"> {/* Top Bar*/}
          <div className="container-custom mobile-pad"> {/* Wrapper Container with max-width of 1140px */}
            <nav className="topbar-navigation">
              <ul className="flex justify-end items-center">
                {upperHeaderLabels}
              </ul>
            </nav>
          </div> {/* Wrapper Container with max-width of 1140px */}
        </div> {/* Top Bar*/}
        <div className="labelLinksLower lower-bar"> {/* Primary Navigation Menu*/}
          <div className="container-custom"> {/* Wrapper Container with max-width of 1140px */}
            <div className="flex flex-col lg:flex-row justify-between lowerLabelLinks">
              <a href="javascript:void(0)" className="header-logo">
                <img
                  src="https://www.epnb.com/wp-content/themes/epnb/img/logo/logo-full-no-tag.svg"
                  title="Ephrata National Bank"
                />
              </a>
              <div className="hamburger flex justify-center items-center absolute right-4 top-4 lg:hidden  ">
                <a href="javascript:void(0)" onClick={handleOnClick}>{SvgIcons.hamburger}</a>                
              </div>
              <nav className={open + " primary-navigation"}>
                <ul className="flex flex-col lg:flex-row justify-end">
                  {lowerHeaderLabels}
                </ul>
                <ul className="mobile-secondary-navigation block lg:hidden">{upperHeaderLabels}</ul> {/* Mobile Secondary Navigation Menu (Top bar converted in mobile) */}
              </nav>
            </div>
          </div> {/* Wrapper Container with max-width of 1140px */}
        </div>{/* Primary Navigation Menu*/}
      </div> {/* Header */}
      <div className="mobile-callout-buttons block lg:hidden"> {/* Mobile Callout Buttons (only shows in mobile view) */}
          <nav className="mobile-callout">
            <ul className="mobile-callout-navigation">
              <li>
                <a href="javascript:void(0)">Locations</a>
              </li>
              <li>
                <a href="tel:+18777736605">(877) 773‑6605</a>
              </li>
            </ul>
          </nav>
      </div> {/* Mobile Callout Buttons (only shows in mobile view) */}
    </>
  );
}
