import {
  useSearchActions,
  DisplayableFacet,
  DisplayableFacetOption,
} from "@yext/search-headless-react";
import { useState } from "react";
import useCollapse from "react-collapsed";
import {
  CompositionMethod,
  useComposedCssClasses,
} from "../hooks/useComposedCssClasses";
import renderCheckboxOption, {
  CheckboxOptionCssClasses,
} from "./utils/renderCheckboxOption";
import * as React from "react";

export type onFacetChangeFn = (
  fieldId: string,
  option: DisplayableFacetOption
) => void;

export interface FacetConfig {
  searchable?: boolean;
  placeholderText?: string;
  label?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

interface FacetProps extends FacetConfig {
  facet: DisplayableFacet;
  onToggle: onFacetChangeFn;
  customCssclasses?: FacetCssClasses;
  cssCompositionMethod?: CompositionMethod;
}

export interface FacetCssClasses extends CheckboxOptionCssClasses {
  label?: string;
  labelIcon?: string;
  labelContainer?: string;
  optionsContainer?: string;
  searchableInputElement?: string;
}

const builtInCssClasses: FacetCssClasses = {
  label: "text-gray-900 text-sm font-medium text-left",
  labelIcon: "w-3",
  labelContainer: "w-full flex justify-between items-center mb-4",
  optionsContainer: "flex flex-col space-y-3",
};

export default function Facet(props: FacetProps): JSX.Element {
  const {
    facet,
    onToggle,
    searchable,
    collapsible,
    defaultExpanded,
    label,
    placeholderText = "Search here...",
    customCssclasses,
    cssCompositionMethod,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssclasses,
    cssCompositionMethod
  );
  const answersUtilities = useSearchActions();
  const hasSelectedFacet = !!facet.options.find((o) => o.selected);
  const [filterValue, setFilterValue] = useState("");
  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: hasSelectedFacet || defaultExpanded,
  });

  cssClasses.labelIcon = cssClasses.labelIcon ?? "";

  const facetOptions = searchable
    ? answersUtilities.searchThroughFacet(facet, filterValue).options
    : facet.options;

  return (
    <fieldset>
      <button
        className={cssClasses.labelContainer}
        {...(collapsible ? getToggleProps() : {})}
      >
        <div className={cssClasses.label}>{label || facet.displayName}</div>
      </button>
      <div {...(collapsible ? getCollapseProps() : {})}>
        {searchable && (
          <input
            className={cssClasses.searchableInputElement}
            type="text"
            placeholder={placeholderText}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
        <div className={cssClasses.optionsContainer}>
          {facetOptions.map((option) =>
            renderCheckboxOption({
              option: {
                id: option.displayName,
                label: `${option.displayName} (${option.count})`,
              },
              onClick: () => onToggle(facet.fieldId, option),
              selected: option.selected,
            })
          )}
        </div>
      </div>
    </fieldset>
  );
}
