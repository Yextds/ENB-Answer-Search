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
  HeadlessConfig,
  SandboxEndpoints,
  useSearchState,
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
  LocationBias,
} from "@yext/search-ui-react";
import DirectAnswer from "../components/DirectAnswer";
import Navigation from "../components/Navigation";
import PageLayout from "../components/PageLayout";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import { LocationCard } from "../components/cards/LocationCard";
import LocationResults from "../components/LocationResults";
import { LocationProvider } from "../components/LocationContext";
import ENBRoundLogo from "../Images/ENB-round-logo.svg";
import ENBPolygonLogo from "../Images/Answer-Head-logo.svg";
import NewPagination from "../components/commons/PaginationComponent";

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

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: `Ephrata National Bank | AS`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    tags: [
      //   {
      //     type: "link",
      //     attributes: {
      //         rel: "icon",
      //         type: "image/x-icon",
      //         href: `https://www.epnb.com/wp-content/themes/epnb/img/logo/logo-full-no-tag.svg`,
      //     },
      // },
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
    ],
  };
};

answersHeadlessConfig.verticalKey = "locations";

const searcher = provideHeadless(answersHeadlessConfig);

const LocationsPage: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { _site } = document;
  // let footerHelpMenu = _site.c_useful_links.headerLinksHeading;
  // let footerHElpSubMenus = _site.c_useful_links.links;
  // let headerProps = _site.c_header_links;
  // console.log(_site.c_useful_links.headerLinksHeading,"Sites");
  // const {
  //   _site
  // } = document;

  return (
    <>
      <Header
        upperHeaderLinks={_site.c_headerlinks}
        lowerHeaderLinks={_site.c_headerlinetwo}
      />
      <SearchHeadlessProvider searcher={searcher}>
        <LocationProvider>
          <div className="container-custom px-5 py-4 xs:py-[1.875rem]">
            {/* Round Centered Logo */}
            <div className="Round-logo">
              <div className="centred-logo">
                <img className="mx-auto" src={ENBRoundLogo} />
              </div>
            </div>
            {/* Round Centered Logo */}
          </div>
          <div className="py-4 xs:pb-14 pt-0">
            <div className="container-custom px-5 pb-4 xs:pb-8 pt-0 xs:px-[4.375rem] bg-white rounded">
              <div className="polygon-logo mb-10">
                <div className="polygon-centred">
                  <img className="mx-auto" src={ENBPolygonLogo} />
                </div>
              </div>
              <div className="yext-search-bar">
                <SearchBar placeholder="Locations Near Me" />
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
