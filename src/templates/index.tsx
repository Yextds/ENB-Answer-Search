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
  Pagination,
  LocationBias,
} from "@yext/search-ui-react";
import DirectAnswer from "../components/DirectAnswer";
import { universalResultsConfig } from "../config/universalResultsConfig";
import UniversalResults from "../components/UniversalResults";
import Navigation from "../components/Navigation";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import ENBRoundLogo from "../Images/ENB-round-logo.svg";
import ENBPolygonLogo from "../Images/Answer-Head-logo.svg";
import favicon from "../Images/favicon.png";
import yext_logo from "../icons/yext_logo.svg";

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

const universalResultsFilterConfig = {
  show: false,
};

export const getPath: GetPath<TemplateProps> = () => {
  return "/index.html";
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

const searcher = provideHeadless(answersHeadlessConfig);

const IndexPage: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;

  return (
    <>
      {/* <Header
        upperHeaderLinks={_site.c_headerlinks}
        lowerHeaderLinks={_site.c_headerlinetwo}
      /> */}
      <SearchHeadlessProvider searcher={searcher}>
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
              <SearchBar placeholder="Location Near Me" />
            </div>

            <Navigation />
            <SpellCheck />
            <DirectAnswer />
            <UniversalResults
              appliedFiltersConfig={universalResultsFilterConfig}
              verticalConfigs={universalResultsConfig}
            />
            <div className="location-info">
              <img className="yextLogo" src={yext_logo} />
              <LocationBias />
            </div>
          </div>
          <Pagination />
        </div>
      </SearchHeadlessProvider>
      <Footer
        footerHeading={_site.c_footerHeading}
        footerlinks={_site.c_footerlinks}
        CopyrightText={_site.c_copyrightText}
        FooterLabel={_site.c_footerLabel}
        FooterAddress={_site.c_footerAddress}
        number={_site.c_number}
      />
    </>
  );
};

export default IndexPage;
