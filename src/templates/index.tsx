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
import { SearchBar, SpellCheck, Pagination } from "@yext/search-ui-react";
import DirectAnswer from "../components/DirectAnswer";
import { universalResultsConfig } from "../config/universalResultsConfig";
import UniversalResults from "../components/UniversalResults";
import Navigation from "../components/Navigation";
import {
  answersHeadlessConfig,
  baseUrl,
} from "../config/answersHeadlessConfig";
import { JsonLd } from "react-schemaorg";
import Footer from "../components/commons/Footer";
import ENBRoundLogo from "../Images/ENB-round-logo.svg";
import favicon from "../Images/favicon.png";
import yext_logo from "../icons/yext_logo.svg";
import LocationBias from "../components/LocationBias";
import HeaderLogo from "../components/commons/HeaderLogo";
import { BreadcrumbList, WebSite } from "schema-dts";
import SearchLogo from "../components/commons/SearchLogo";

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
const metaTitle = "Ephrata National Bank | Find your Answers";
const metaDescription =
  " Ephrata National Bank - get all information related to locations, branch details and all queries here.";
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
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
          content: `${metaTitle}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${metaDescription}`,
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
          href: baseUrl,
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
      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },
      // Meta Title and Description
    ],
  };
};

const searcher = provideHeadless(answersHeadlessConfig);
export interface SiteData {
  c_number: number;
  c_footerAddress: string;
  c_footerLabel: string;
  c_copyrightText: string;
  c_footerlinks: string;
  c_footerHeading: string;
  id: number;
}
interface IndexData {
  _site: SiteData;
}
interface IndexPage extends TemplateRenderProps {
  document: IndexData;
}

interface ListType {
  "@type": "ListItem";
  name: string;
  position?: number;
  logo?: string;
  "@id": string;
}

const IndexPage: Template<IndexPage> = ({ document }) => {
  const { _site } = document;

  return (
    <>
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          name: "Ephrata National Bank",
        }}
      />
      <JsonLd<ListType>
        item={{
          "@context": "https://schema.org",
          "@type": "ListItem",
          "@id": "https://www.epnb.com/",
          position: 1,
          name: "Ephrata National Bank",
        }}
      />
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://www.epnb.com/",
          name: "Ephrata National Bank",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://www.epnb.com/search/{search_term_string}/",
            },
          },
        }}
      />
      <SearchHeadlessProvider searcher={searcher}>
        <div className="container-custom px-5 py-4 xs:py-[1.875rem]">
          {/* Round Centered Logo */}
          <HeaderLogo />
          {/* Round Centered Logo */}
        </div>
        <div className="py-4 xs:pb-14 pt-0 min-h-screen">
          <div className="container-custom px-5 pb-4 xs:pb-8 pt-0 xs:px-[4.375rem] bg-white rounded min-h-screen">
          <SearchLogo/>
            <div className="yext-search-bar">
              <SearchBar placeholder="Search" />
            </div>

            <Navigation />
            <SpellCheck />
            <DirectAnswer />
            <div className="min-h-screen">
              <UniversalResults
              appliedFiltersConfig={universalResultsFilterConfig}
              verticalConfigs={universalResultsConfig}
            />
            </div>
            
            <div className="location-info">
              <img className="yextLogo" src={yext_logo} alt="Yext logo" width={40} height={40}/>
              <LocationBias />
            </div>
          </div>
          <Pagination />
        </div>
      </SearchHeadlessProvider>
      <Footer
        footerHeading={document._site.c_footerHeading}
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
