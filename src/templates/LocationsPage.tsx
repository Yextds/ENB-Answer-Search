import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
  
} from "@yext/search-headless-react";

import {
  SearchBar,
  
  SpellCheck,
  ResultsCount,
  
  AppliedFilters,
  LocationBias,
} from "@yext/search-ui-react";
import DirectAnswer from "../components/DirectAnswer";
import Navigation from "../components/Navigation";
import { answersHeadlessConfig, baseUrl } from "../config/answersHeadlessConfig";

import Footer from "../components/commons/Footer";
import { LocationCard } from "../components/cards/LocationCard";
import LocationResults from "../components/LocationResults";
import { LocationProvider } from "../components/LocationContext";
import ENBRoundLogo from "../Images/ENB-round-logo.svg";
import ENBPolygonLogo from "../Images/Answer-Head-logo.svg";
import NewPagination from "../components/commons/PaginationComponent";
import favicon from "../Images/favicon.png";

export const config: TemplateConfig = {
  stream: {
    $id: "global-config",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: ["id", "uid", "meta", "name"],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["global-config"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = () => {
  return "/locations";
};
const metaTitle = "Ephrata National Bank | Locations"
const metaDescription = "Ephrata National Bank | Find all branch details, ATMs timings and Locations here."
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  
}): HeadConfig => {
  return {
    title: `Ephrata National Bank | AS`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
            rel: "icon",
            type: "image/x-icon",
            href: favicon,
        },
    },
  
   {
     type: "meta",
     attributes: {
       name: "title",
       content: `Ephrata National Bank | Locations`,
     },
   },
   {
     type: "meta",
     attributes: {
       name: "description",
       content: `Ephrata National Bank | Find all branch details, ATMs timings and Locations here.`,
     },
   },
   {
     type: "meta",
     attributes: {
       name: "author",
       content: "Ephrata National Bank",
     },
   },
   {
     type: "link",
     attributes: {
       rel: "canonical",
       href: baseUrl + "locations",
     },
   },
   {
     type: "meta",
     attributes: {
       property: "og:title",
       content: `${metaTitle}`,
     },
   },
   {
     type: "meta",
     attributes: {
       property: "og:description",
       content: `${metaDescription}`,
     },
   },
   {
     type: "meta",
     attributes: {
       property: "og:url",
       content: baseUrl,
     },
   },
  
   {
     type: "meta",
     attributes: {
       property: "og:image",
       content: `${ENBRoundLogo}`,
     },
   },
   {
     type: "meta",
     attributes: {
       property: "twitter:title",
       content: `${metaTitle}`,
     },
   },
   {
     type: "meta",
     attributes: {
       name: "twitter:card",
       content: "summary",
     },
   },
   {
     type: "meta",
     attributes: {
       name: "twitter:url",
       content: baseUrl,
     },
   },
  
   {
     type: "meta",
     attributes: {
       name: "twitter:description",
       content: `${metaDescription}`,
     },
   },
  
   {
     type: "meta",
     attributes: {
       name: "twitter:image",
       content: `${ENBRoundLogo}`,
     },
   },
    
    ],
  };
};

answersHeadlessConfig.verticalKey = "locations";

const searcher = provideHeadless(answersHeadlessConfig);

const LocationsPage: Template<TemplateRenderProps> = ({
 
  document,
}) => {
  const { _site } = document;
  

  return (
    <>
     
      <SearchHeadlessProvider searcher={searcher}>
        <LocationProvider>
          <div className="container-custom px-5 py-4 xs:py-[1.875rem]">
            {/* Round Centered Logo */}
            <div className="Round-logo">
              <div className="centred-logo">
                <img className="mx-auto" src={ENBRoundLogo} alt="logo"/>
              </div>
            </div>
            {/* Round Centered Logo */}
          </div>
          <div className="py-4 xs:pb-14 pt-0">
            <div className="container-custom px-5 pb-4 xs:pb-8 pt-0 xs:px-[4.375rem] bg-white rounded">
              <div className="polygon-logo mb-10">
                <div className="polygon-centred">
                  <img className="mx-auto" src={ENBPolygonLogo} alt="logo"/>
                </div>
              </div>
              <div className="yext-search-bar">
                <SearchBar placeholder="Search ENB Locations" />
              </div>
              <Navigation />
              <DirectAnswer />
              <SpellCheck />
              <ResultsCount />
              <AppliedFilters hiddenFields={["builtin.entityType"]} />
              {/* <VerticalResults CardComponent={LocationCard} /> */}
              <LocationResults
                verticalKey="locations"
                cardConfig={{ CardComponent: LocationCard }}
              />
              <LocationBias />
            </div>
            <NewPagination />
          </div>
        </LocationProvider>
      </SearchHeadlessProvider>
      <Footer footerHeading={_site.c_footerHeading} footerlinks={_site.c_footerlinks} CopyrightText={_site.c_copyrightText} FooterLabel={_site.c_footerLabel} FooterAddress={_site.c_footerAddress} number={_site.c_number}/>
    </>
  );
};

export default LocationsPage;
