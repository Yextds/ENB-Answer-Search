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
  useSearchState,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import {
  SearchBar,
  SpellCheck,
  ResultsCount,
  Pagination,
  AppliedFilters,
  } from "@yext/search-ui-react";
// DirectAnswer

import Navigation from '../components/Navigation';
import { answersHeadlessConfig } from '../config/answersHeadlessConfig';
import Header from "../components/commons/Header";
import Footer from "../components/commons/Footer";
import { ProductsCard } from "../components/cards/ProductsCard";
import VerticalResults from "../components/VerticalResults";
import DirectAnswer from "../components/DirectAnswer";
import Facets from "../components/Facets";
import NewPagination from "../components/commons/PaginationComponent";

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
  return "/insurances";
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

answersHeadlessConfig.verticalKey = "insurances";
const searcher = provideHeadless(answersHeadlessConfig);

const ArticlesPage: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {

const {
  _site
} = document;

 return (
    <>
      <Header upperHeaderLinks={_site.c_upperPart} lowerHeaderLinks={_site.c_lowerPart}  />
      <SearchHeadlessProvider searcher={searcher}>
        <div className="px-4 py-8">
          <div className="mx-auto flex max-w-5xl flex-col">
            <SearchBar placeholder='Search...' />
            <Navigation />
            <Facets/>
            <DirectAnswer />
            <SpellCheck />
            <ResultsCount />
            <AppliedFilters hiddenFields={['builtin.entityType']} />
            <VerticalResults displayAllOnNoResults={true} CardComponent={ProductsCard} />
            {/* <LocationBias /> */}
          </div>
          <NewPagination/>
        </div>
      </SearchHeadlessProvider>
      <Footer houseLender={_site.c_housingLender} office={_site.c_office} />
    </>
  );


};

export default ArticlesPage;
