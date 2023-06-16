import { useSearchState, VerticalResults } from "@yext/search-headless-react";
import StandardSection from "../sections/StandardSection";
import { AppliedFiltersProps } from "../components/AppliedFilters";
import SectionHeader from "../sections/SectionHeader";
import { SectionComponent } from "../models/sectionComponent";
import { CardConfig } from "../models/cardComponent";
import {
  useComposedCssClasses,
  CompositionMethod,
} from "../hooks/useComposedCssClasses";
import classNames from "classnames";
import * as React from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import LoadingSpinner from "./commons/LoadingSpinner";

interface UniversalResultsCssClasses {
  container?: string;
  results___loading?: string;
}

const builtInCssClasses: UniversalResultsCssClasses = {
  container: "space-y-8 mt-6",
  results___loading: "opacity-50",
};

export interface VerticalConfig {
  SectionComponent?: SectionComponent;
  cardConfig?: CardConfig;
  label?: string;
  viewAllButton?: boolean;
}

interface AppliedFiltersConfig
  extends Omit<AppliedFiltersProps, "appliedQueryFilters"> {
  show: boolean;
}

interface UniversalResultsProps {
  appliedFiltersConfig?: AppliedFiltersConfig;
  verticalConfigs: Record<string, VerticalConfig>;
  customCssClasses?: UniversalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * A component that displays all the vertical results of a universal search.
 */
export default function UniversalResults({
  verticalConfigs,
  appliedFiltersConfig,
  customCssClasses,
  cssCompositionMethod,
}: UniversalResultsProps): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const resultsFromAllVerticals =
    useSearchState((state) => state?.universal?.verticals) || [];
 
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
 
  //UseEffect - Starts  - Code to get Default Initial Search
  const searchAction = useSearchActions();
  useEffect(() => {
    searchAction.executeUniversalQuery();
  }, []);

  // UseEffect - Ends  - Code to get Default Initial Search
  if (resultsFromAllVerticals.length === 0) {
    return (
      <>
      {isLoading == true ? <LoadingSpinner /> : <>
      <div className="mb-6 pb-6 mt-6 pt-6">
        <p className="text-2xl font-bold">No results found</p>
      </div>
    </>}
    </>
    );
  }

  const resultsClassNames = classNames(cssClasses.container, {
    [cssClasses.results___loading ?? ""]: isLoading,
  });

  return (
    <div className={resultsClassNames}>
      {renderVerticalSections({
        resultsFromAllVerticals,
        appliedFiltersConfig,
        verticalConfigs,
      })}
    </div>
  );
}

interface VerticalSectionsProps extends UniversalResultsProps {
  resultsFromAllVerticals: VerticalResults[];
}

/**
 * Renders a list of SectionComponent based on the given list of vertical results and corresponding configs,
 * including specifing what section template to use.
 */
function renderVerticalSections(props: VerticalSectionsProps): JSX.Element {
  const { resultsFromAllVerticals, verticalConfigs } = props;
  // const latestQuery = useSearchState((state) => state.query.mostRecentSearch);

  return (
    <>
      {resultsFromAllVerticals
        .filter((verticalResults) => verticalResults.results)
        .map((verticalResults) => {
          const verticalKey = verticalResults.verticalKey;
          const verticalConfig = verticalConfigs[verticalKey] || {};

          const label = verticalConfig.label ?? verticalKey;
          const results = verticalResults.results;

          const SectionComponent =
            verticalConfig.SectionComponent || StandardSection;

          const { show, ...filterconfig } = props.appliedFiltersConfig || {};
          const appliedFiltersConfig = show
            ? {
                ...filterconfig,
                appliedQueryFilters: verticalResults.appliedQueryFilters,
              }
            : undefined;

          const resultsCountConfig = {
            resultsCount: verticalResults.resultsCount,
            resultsLength: results.length,
          };
          return (
            <>
              <SectionComponent
                results={results}
                verticalKey={verticalKey}
                header={
                  <SectionHeader
                    {...{
                      label,
                      resultsCountConfig,
                      appliedFiltersConfig,
                      verticalKey,
                      viewAllButton: verticalConfig.viewAllButton,
                    }}
                  />
                }
                cardConfig={verticalConfig.cardConfig}
                key={verticalKey}
              />
              <div className="viewMore">
                <a href={`/${verticalKey}`}>
                  View All
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9131 5.31373L5.72763 10.4992L4.78482 9.55637L9.02746 5.31373L4.78482 1.07109L5.72763 0.128282L10.9131 5.31373ZM6.19903 5.31373L1.01358 10.4992L0.0707744 9.55637L4.31341 5.31373L0.0707737 1.07109L1.01358 0.128283L6.19903 5.31373Z"
                      fill="#D11242"
                    />
                  </svg>
                </a>
              </div>
            </>
          );
        })}
    </>
  );
}
