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

import { useSearchState } from "@yext/search-headless-react";
import { DisplayableFilter } from "../models/displayableFilter";
import classNames from "classnames";
import locationMarker from "../Images/heading-marker.svg";

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
  viewMoreContainer: "view-more-btn",
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
}

export default function SectionHeader(props: SectionHeaderConfig): JSX.Element {
  const {
    label,
    verticalKey,

    appliedFiltersConfig,
    customCssClasses,
    cssCompositionMethod,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

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
      <div className="vertical-label">
        <div className="label-wrapper">
          {verticalKey == "locations" ? (
            <>
              <img
                alt="location marker"
                src={locationMarker}
                width={22}
                height={22}
              />
            </>
          ) : (
            <>
              <img alt="faq icon" src={faqicon} width={21} height={21} />
            </>
          )}

          <h2>{label}</h2>
        </div>
      </div>

      {appliedFiltersConfig && (
        <AppliedFiltersDisplay
          displayableFilters={displayableFilters}
          cssClasses={cssClasses}
        />
      )}
    </div>
  );
}
