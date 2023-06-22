import { CardComponent, CardConfigTypes } from "../models/cardComponent";
import { useSearchState, Result } from "@yext/search-headless-react";
import classNames from "classnames";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import * as React from "react";

interface VerticalResultsCssClasses extends PaginationCssClasses {
  results___loading?: string;
}

const builtInCssClasses: VerticalResultsCssClasses = {
  results___loading: "opacity-50",
};

interface VerticalResultsDisplayProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;
  isLoading?: boolean;
  results: Result[];
  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

/**
 * A Component that displays all the search results for a given vertical.
 *
 * @param props - The props for the Component, including the results and the card type
 *                to be used.
 */
export function VerticalResultsDisplay(
  props: VerticalResultsDisplayProps
): JSX.Element | null {
  const {
    CardComponent,
    results,
    cardConfig = {},
    isLoading = false,
    customCssClasses,
    cssCompositionMethod,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );

  if (results.length === 0) {
    return null;
  }

  const resultsClassNames = classNames({
    [cssClasses.results___loading ?? ""]: isLoading,
  });

  return (
    <div className={resultsClassNames}>
      {results &&
        results.map((result) =>
          renderResult(CardComponent, cardConfig, result)
        )}
    </div>
  );
}

/**
 * Renders a single result using the specified card type and configuration.
 *
 * @param CardComponent - The card for the vertical.
 * @param cardConfig - Any card-specific configuration.
 * @param result - The result to render.
 */
function renderResult(
  CardComponent: CardComponent,
  cardConfig: CardConfigTypes,
  result: Result
): JSX.Element {
  return (
    <CardComponent
      result={result}
      configuration={cardConfig}
      key={result.id || result.index}
    />
  );
}

interface VerticalResultsProps {
  CardComponent: CardComponent;
  cardConfig?: CardConfigTypes;

  customCssClasses?: VerticalResultsCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export default function VerticalResults(
  props: VerticalResultsProps
): JSX.Element | null {
  const { ...otherProps } = props;
  /**
   * Direct Answer code - Starts
   */

  /**
   * Direct Answer Code - Ends
   */

  const verticalResults =
    useSearchState((state) => state.vertical.results) || [];
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const aleternateVerticals = useSearchState(
    (state) => state.vertical.noResults?.alternativeVerticals
  );
  const filterVariable =
    aleternateVerticals?.filter(
      (filtredResulta) => filtredResulta.resultsCount > 0
    ) || [];
  const filterVariableLength = filterVariable.length;
  const returnedAlternateVerticals = filterVariable.map((res: any) => {
    const verticalName = res.verticalKey.toUpperCase();
    const verticalSlug = res.verticalKey;
    return (
      <>
        <a href={"/" + verticalSlug} className="text-2xl font-semibold">
          {verticalName}
        </a>
        <br></br>
      </>
    );
  });

  const results = verticalResults;

  return (
    <>
      {results.length === 0 && isLoading === false ? (
        <div className="alternateVerticals  min-h-[25.563rem] sm:min-h-[21.563rem] lg:min-h-[16.563rem]">
          {filterVariableLength > 0 ? (
            <p className="text-xl font-bold ">
              No result found in this vertical... Showing verticals related to
              this query<br></br>
              {returnedAlternateVerticals}
            </p>
          ) : (
            <p>OOps ! ..No results found in any vertical for this query.</p>
          )}
        </div>
      ) : (
        <VerticalResultsDisplay
          results={results}
          isLoading={isLoading}
          {...otherProps}
        />
      )}
    </>
  );
}

interface PaginationCssClasses {
  container?: string;
  labelContainer?: string;
  label?: string;
  selectedLabel?: string;
  leftIconContainer?: string;
  rightIconContainer?: string;
  icon?: string;
}
