import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import * as React from "react";
import { useComposedCssClasses } from "../../hooks/useComposedCssClasses";
import arrowIcon from "../../Images/Arrow-down.svg";

interface PaginationCssClasses {
  container?: string;
  labelContainer?: string;
  label?: string;
  selectedLabel?: string;
  leftIconContainer?: string;
  rightIconContainer?: string;
  icon?: string;
}

const builtInPaginationCssClasses: PaginationCssClasses = {
  container: "flex justify-center mb-4 mt-8 pagination",
  labelContainer: "inline-flex shadow-sm -space-x-px",
  label: "pagination-button",
  selectedLabel: "active-pagination-buton",
  leftIconContainer: "first-pagination-button",
  rightIconContainer: "last-pagination-button",
  icon: "w-3 text-gray-500",
};

function generatePaginationLabels(
  pageNumber: number,
  maxPageCount: number
): string[] {
  const paginationLabels: string[] = [];
  const previousPageNumber = pageNumber - 1;
  const nextPageNumber = pageNumber + 1;

  if (previousPageNumber > 3) {
    paginationLabels.push("1", "...", `${previousPageNumber}`);
  } else if (previousPageNumber !== 0) {
    [...Array(previousPageNumber)].forEach((_, index) =>
      paginationLabels.push(`${index + 1}`)
    );
  }
  paginationLabels.push(`${pageNumber}`);
  if (maxPageCount - nextPageNumber > 2) {
    paginationLabels.push(`${nextPageNumber}`, "...", `${maxPageCount}`);
  } else if (nextPageNumber <= maxPageCount) {
    [...Array(maxPageCount - nextPageNumber + 1)].forEach((_, index) =>
      paginationLabels.push(`${nextPageNumber + index}`)
    );
  }
  return paginationLabels;
}

export default function NewPagination(): JSX.Element | null {
  const cssClasses = useComposedCssClasses(builtInPaginationCssClasses);
  const answersAction = useSearchActions();
  const offset = useSearchState((state) => state.vertical.offset) || 0;
  const limit = useSearchState((state) => state.vertical.limit) || 10;
  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  const executeSearchWithNewOffset = (newOffset: number) => {
    answersAction.setOffset(newOffset);
    answersAction.executeVerticalQuery();
  };
  const onSelectNewPage = (evt: React.MouseEvent) => {
    const newPageNumber = Number(evt.currentTarget.textContent);
    newPageNumber && executeSearchWithNewOffset(limit * (newPageNumber - 1));
  };

  const totalResults = useSearchState((state) => state.vertical.resultsCount);

  const maxPageCount = Math.ceil(totalResults / limit);

  if (maxPageCount <= 1) {
    return null;
  }
  const pageNumber = offset / limit + 1;
  const paginationLabels: string[] = generatePaginationLabels(
    pageNumber,
    maxPageCount
  );
  if (isLoading == true) {
    return <></>;
  } else {
    return (
      <div className={cssClasses.container}>
        <nav className={cssClasses.labelContainer} aria-label="Pagination">
          {pageNumber === 1 ? null : (
            <button
              aria-label="Navigate to the previous results page"
              className={cssClasses.leftIconContainer}
              onClick={() => executeSearchWithNewOffset(offset - limit)}
              disabled={pageNumber === 1}
            >
              {/* <PageNavigationIcon className={cssClasses.icon + ' transform -rotate-90'} /> */}
              <img
                alt="arrow icon"
                className="w-4 h-4 transform rotate-90"
                src={arrowIcon}
              />
            </button>
          )}

          {paginationLabels.map((label, index) => {
            switch (label) {
              case "...":
                return (
                  <button key={index} className={cssClasses.label}>
                    {label}
                  </button>
                );
              case `${pageNumber}`:
                return (
                  <button
                    key={index}
                    className={cssClasses.selectedLabel}
                    onClick={onSelectNewPage}
                  >
                    {label}
                  </button>
                );
              default:
                return (
                  <button
                    key={index}
                    className={cssClasses.label}
                    onClick={onSelectNewPage}
                  >
                    {label}
                  </button>
                );
            }
          })}
          {pageNumber === maxPageCount ? null : (
            <button
              aria-label="Navigate to the next results page"
              className={cssClasses.rightIconContainer}
              onClick={() => executeSearchWithNewOffset(offset + limit)}
              disabled={pageNumber === maxPageCount}
            >
              {/* <PageNavigationIcon className={cssClasses.icon + ' transform rotate-90'} /> */}
              <img
                alt="arrow icon"
                className="w-4 h-4 transform -rotate-90"
                src={arrowIcon}
              />
            </button>
          )}
        </nav>
      </div>
    );
  }
}
