import classNames from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import KebabIcon  from '../icons/kebab.svg';
import { useComposedCssClasses, CompositionMethod } from '../hooks/useComposedCssClasses';
import { useSearchActions, useSearchState } from '@yext/search-headless-react';
import { universalResultsConfig } from '../config/universalResultsConfig';

import * as React from 'react';
import usePageSetupEffect from '../hooks/usePageSetupEffect';





interface NavigationCssClasses {
  nav?: string,
  linksWrapper?: string,
  menuWrapper?: string,
  navLinkContainer?: string,
  navLinkContainer___active?: string,
  navLink?: string,
  kebabIcon?: string,
  menuButton?: string,
  menuButtonContainer?: string,
  menuButton___menuOpen?: string,
  menuButton___hasActiveLink?: string,
  menuContainer?: string,
  menuNavLink?: string,
  menuNavLinkContainer?: string,
  menuNavLinkContainer___active?: string
}

const builtInCssClasses: NavigationCssClasses = {
  nav: 'vertical-navigation',
  navLinkContainer: 'vertical-navigation-item',
  navLink: 'vertical-nav-link',
  navLinkContainer___active: 'active',
  kebabIcon: 'pointer-events-none',
  menuButtonContainer: 'relative flex flex-grow justify-end mr-4',
  menuButton: 'flex items-center text-gray-600 font-medium text-md h-12 mt-1 p-3 border-opacity-0 rounded-md hover:bg-gray-200',
  menuButton___menuOpen: 'bg-gray-100 text-gray-800',
  menuButton___hasActiveLink: 'text-blue-600',
  menuContainer: 'absolute flex-col bg-white border top-14 py-2 rounded-lg shadow-lg',
  menuNavLink: 'px-4 py-2 flex-grow',
  menuNavLinkContainer: 'flex text-gray-600 hover:bg-gray-100 text-lg hover:text-gray-800 focus:text-gray-800',
  menuNavLinkContainer___active: 'text-blue-600 hover:text-blue-600 focus:text-blue-600'
}

interface LinkData {
  to: string,
  label: string
}

interface NavigationProps {
  // links: LinkData[],
  customCssClasses?: NavigationCssClasses,
  cssCompositionMethod?: CompositionMethod
}

export default function Navigation({ customCssClasses, cssCompositionMethod }: NavigationProps) {
  // const verticalKey = "faqs"
  // usePageSetupEffect(verticalKey, 6);
  // Query - Starts
const[navparmam,setNavParam]=useState('');
const SearchQuery: any = useSearchState(state => state.query.input);


function getQueryParam(){
  const queryString: any = window.location.search;
  const urlParams: any = new URLSearchParams(queryString);
  const product = urlParams.get('query');
  return product;
}    
    
// const product = urlParams.get('query');
const answersActions = useSearchActions();


useEffect(() => {
  console.log(getQueryParam(),"product")
  if (getQueryParam() != null) {
    answersActions.setQuery(getQueryParam())
  }
  else {

    if (SearchQuery != '' && SearchQuery != null) {
      updateParam(SearchQuery)
      setNavParam(SearchQuery)
    } else {
      updateParam('')
      setNavParam('')
    }

  }
}, []);



useEffect(() => {
  if (SearchQuery != '' && SearchQuery != null) {
    updateParam(SearchQuery)
    setNavParam(SearchQuery)
  } else {
    updateParam('')
    setNavParam('')
  }
}, [SearchQuery])


function updateParam(latestUserInput: any) {
  const paramValue = latestUserInput; // Replace with your updated value
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('query', paramValue);
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
  
  window.history.replaceState({}, '', newUrl);
}

//Query - Ends

  // Default Search Code -  Starts

  const searchAction = useSearchActions();
  useEffect(() => {
    searchAction.executeVerticalQuery();  
  }, [])

  // Default Search Code - Ends

  const links = [
    {
      to: '/',
      label: 'All'
    },
    ...Object.entries(universalResultsConfig).map(([verticalKey, config]) => ({
      to: verticalKey,
      label: config.label || verticalKey
    }))
  ];

  const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
  const currentVertical = useSearchState(state => state.vertical.verticalKey);
  if(currentVertical==="faqs"){
    usePageSetupEffect(currentVertical, 6);
  }else if(currentVertical==="insurances"){
    usePageSetupEffect(currentVertical, 2);
  }
  
  // Close the menu when clicking the document
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const handleDocumentClick = (e: MouseEvent) => {
    if (e.target !== menuRef.current) {
      setMenuOpen(false);
    }
  };
  useLayoutEffect(() => {
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // Responsive tabs
  const [numOverflowLinks, setNumOverflowLinks] = useState<number>(0);
  const navigationRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    const navEl = navigationRef.current;
    if (!navEl) {
      return;
    }
    const isOverflowing = navEl.scrollWidth > navEl.offsetWidth;
    if (isOverflowing && numOverflowLinks < links.length) {
      setNumOverflowLinks(numOverflowLinks + 1);
    }
  }, [links.length, numOverflowLinks])
  useLayoutEffect(handleResize, [handleResize]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function resizeListener() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNumOverflowLinks(0);
        handleResize()
      }, 50)
    };
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, [handleResize]);

  const visibleLinks = links.slice(0, links.length - numOverflowLinks);
  const overflowLinks = links.slice(-numOverflowLinks);
  const isActiveLink = ({ to }: LinkData) => to === currentVertical || (to === '/' && currentVertical === undefined)
  const activeVisibleLinkIndex = visibleLinks.findIndex(isActiveLink);
  const activeMenuLinkIndex = overflowLinks.findIndex(isActiveLink);
  const menuContainsActiveLink = activeMenuLinkIndex >= 0;
  const menuButtonClassNames = classNames(cssClasses.menuButton, {
    [cssClasses.menuButton___menuOpen ?? '']: menuOpen,
    [cssClasses.menuButton___hasActiveLink ?? '']: menuContainsActiveLink
  });

  return (
    <nav className={cssClasses.nav} ref={navigationRef}>
      <ul>
      {visibleLinks.map((l, index) => renderLink(l, index === activeVisibleLinkIndex, cssClasses,navparmam))}
      {numOverflowLinks > 0 &&
        <div className={cssClasses.menuButtonContainer}>
          <button
            className={menuButtonClassNames}
            ref={menuRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src={KebabIcon} className={cssClasses.kebabIcon} /> More
          </button>
          {menuOpen && 
            <div className={cssClasses.menuContainer}>
              {menuOpen && overflowLinks.map((l, index) => renderLink(l, index === activeMenuLinkIndex, {
                navLink: cssClasses.menuNavLink,
                navLinkContainer: cssClasses.menuNavLinkContainer,
                navLinkContainer___active: cssClasses.menuNavLinkContainer___active
              },navparmam))}
            </div>
          }
        </div>
      }
</ul>
    </nav>
  )
}

function renderLink(
  linkData: LinkData,
  isActiveLink: boolean,
  cssClasses: { navLinkContainer?: string, navLinkContainer___active?: string, navLink?: string },
  navparmam:any)
{
  const { to, label } = linkData;
  const navLinkContainerClasses = classNames(cssClasses.navLinkContainer, {
    [cssClasses.navLinkContainer___active ?? '']: isActiveLink
  });
  return (
    <>
    
    <li className={navLinkContainerClasses} key={to}>
      <a
        className={cssClasses.navLink}
        href={`${to}?query=${navparmam}`}
      >
        {label}
      </a>
    </li>
    </>
  )
}