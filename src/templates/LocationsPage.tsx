import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
  TemplateConfig
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  SandboxEndpoints,
  useSearchState
  
} from "@yext/search-headless-react";
import {
  LocationBiasMethod,
  SearchTypeEnum,
  useAnswersActions,
  useAnswersState,
} from "@yext/answers-headless-react";
import {
  SearchBar,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  AlternativeVerticals,
  AppliedFilters,
  LocationBias
} from "@yext/search-ui-react";
import DirectAnswer from "../components/DirectAnswer";
import Navigation from '../components/Navigation';
import PageLayout from "../components/PageLayout";
import { answersHeadlessConfig } from '../config/answersHeadlessConfig';
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import { LocationCard } from "../components/cards/LocationCard";
import LocationResults from "../components/LocationResults";
import { LocationProvider } from "../components/LocationContext";

export const config: TemplateConfig = {
  stream: {
    $id: "header-and-footer",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["header-and-footer"] 
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

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
    return {
      title: `Ephrata National Bank | AS`,
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      tags : [
        {
          type: "link",
          attributes: {
              rel: "icon",
              type: "image/x-icon",
              href: `https://www.epnb.com/wp-content/themes/epnb/img/logo/logo-full-no-tag.svg`,
          },
      },
      // Favicon
      // Meta Title and Description
      {
          type: "meta",
          attributes: {
              name: "title",
              content: `Answers | Ephrata National Bank`,
          },
      },
      {
          type: "meta",
          attributes: {
              name: "description",
              content: `Answers | Ephrata National Bank`,
          },
      },
      // Meta Title and Description
      ]
    };
  };

answersHeadlessConfig.verticalKey = "locations";

const searcher = provideHeadless(answersHeadlessConfig);

const LocationsPage: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {

  
const {
  _site
} = document;
// let footerHelpMenu = _site.c_useful_links.headerLinksHeading;
// let footerHElpSubMenus = _site.c_useful_links.links;
// let headerProps = _site.c_header_links;
// console.log(_site.c_useful_links.headerLinksHeading,"Sites");
  // const {
  //   _site
  // } = document;


  
  return (
    <>
      <Header upperHeaderLinks={_site.c_upperPart} lowerHeaderLinks={_site.c_lowerPart}/>
      <SearchHeadlessProvider searcher={searcher}>
      <LocationProvider>
        <div className="py-4 xs:py-8">
          <div className="container-custom px-5 py-4 xs:py-8 bg-white rounded">
            <SearchBar placeholder='Search...' />
            <Navigation />
            <DirectAnswer />
            <SpellCheck />
            <ResultsCount />
            <AppliedFilters hiddenFields={['builtin.entityType']} />
            {/* <VerticalResults CardComponent={LocationCard} /> */}
            <LocationResults
                  verticalKey="locations"
                  cardConfig={{ CardComponent: LocationCard }}
                />
            <LocationBias />
          </div>
          <Pagination />
        </div>
        </LocationProvider>
      </SearchHeadlessProvider>
      <Footer houseLender={_site.c_housingLender} office={_site.c_office} />
    </>
  );


};

export default LocationsPage;

