// import { Link } from "react-router-dom";
import {
  AppliedFiltersCssClasses,
  AppliedFiltersDisplay,
  AppliedFiltersProps,
} from "../components/AppliedFilters";
import { ResultsCountConfig } from "../components/ResultsCount";
import {
  useComposedCssClasses,
  CompositionMethod,
} from "../hooks/useComposedCssClasses";
import { ReactComponent as CollectionIcon } from "../icons/collection.svg";
import { useSearchState } from "@yext/search-headless-react";
import { DisplayableFilter } from "../models/displayableFilter";
import classNames from "classnames";
import locationMarker from "../Images/heading-marker.svg";
import faqMarker from "../Images/faq-marker.svg";
import * as React from "react";
import faqicon from "../icons/faq.svg";

interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
  sectionHeaderContainer?: string;
  sectionHeaderIconContainer?: string;
  sectionHeaderLabel?: string;
  viewMoreContainer?: string;
  viewMoreLink?: string;
}

const builtInCssClasses: SectionHeaderCssClasses = {
  sectionHeaderContainer: "vertical-heading",
  sectionHeaderIconContainer: "w-5 h-5",
  sectionHeaderLabel: "font-bold text-gray-800 text-base pl-3",
  viewMoreContainer:
    "view-more-btn",
  viewMoreLink: "text-white",
  appliedFiltersContainer: "ml-3 flex flex-wrap",
  nlpFilter:
    "border rounded-3xl px-3 py-1.5 text-sm font-medium italic text-gray-800 mr-2",
  removableFilter:
    "flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2",
  removeFilterButton: "w-2 h-2 text-gray-500 m-1.5",
};

interface SectionHeaderConfig {
  label: string;
  resultsCountConfig?: ResultsCountConfig;
  appliedFiltersConfig?: AppliedFiltersProps;
  customCssClasses?: SectionHeaderCssClasses;
  cssCompositionMethod?: CompositionMethod;
  verticalKey: string;
  viewAllButton?: boolean;
}

export default function SectionHeader(props: SectionHeaderConfig): JSX.Element {
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedFiltersConfig,
    customCssClasses,
    cssCompositionMethod,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const latestQuery = useSearchState((state) => state.query.mostRecentSearch);
  const displayableFilters =
    appliedFiltersConfig?.appliedQueryFilters?.map(
      (appliedQueryFilter): DisplayableFilter => {
        return {
          filterType: "NLP_FILTER",
          filter: appliedQueryFilter.filter,
          groupLabel: appliedQueryFilter.displayKey,
          label: appliedQueryFilter.displayValue,
        };
      }
    ) ?? [];

  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = classNames(
    cssClasses.appliedFiltersContainer,
    {
      [cssClasses.appliedFiltersContainer___loading ?? ""]: isLoading,
    }
  );

  return (
    <div className={cssClasses.sectionHeaderContainer}>
      {/* <div className={cssClasses.sectionHeaderIconContainer}> */}
      {/* <CollectionIcon></CollectionIcon> */}
      {/* </div> */}
      <div className="vertical-label">
        <div className="label-wrapper">
          {verticalKey=="locations" ? <>< img src={locationMarker}/></> :<>< img src={faqicon}/></> }
         
          <h2>{label}</h2>
        </div>
      </div>
      {/* TODO (cea2aj): Add support for ResultsCountDisplay once we get the mocks from UX
        {resultsCountConfig &&
           <ResultsCountDisplay resultsLength={resultsCountConfig.resultsLength} resultsCount={resultsCountConfig.resultsCount} />} */}
      {appliedFiltersConfig && (
        <AppliedFiltersDisplay
          displayableFilters={displayableFilters}
          cssClasses={cssClasses}
        />
      )}
      {viewAllButton && (
        <div className={cssClasses.viewMoreContainer}>
          <a
            className={cssClasses.viewMoreLink}
            href={`/${verticalKey}?query=${latestQuery}`}>
            View all
          </a>
        </div>
      )}
    </div>
  );
}
