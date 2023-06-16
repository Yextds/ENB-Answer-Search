import * as React from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { useEffect } from "react";

const SearchQuery: any = useSearchState((state) => state.query.input);

const queryString: any = window.location.search;
const urlParams: any = new URLSearchParams(queryString);

const product = urlParams.get("query");
const answersActions = useSearchActions();

useEffect(() => {
  if (product != null) {
    answersActions.setQuery(product);
  } else {
    if (SearchQuery != "" && SearchQuery != null) {
      updateParam(SearchQuery);
    } else {
      updateParam("");
    }
  }
}, []);

useEffect(() => {
  if (SearchQuery != "" && SearchQuery != null) {
    updateParam(SearchQuery);
  } else {
    updateParam("");
  }
}, [SearchQuery]);

export default function updateParam(latestUserInput: any) {
  const paramValue = latestUserInput; // Replace with your updated value
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("query", paramValue);
  const newUrl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    searchParams.toString();

  window.history.replaceState({}, "", newUrl);

  return (
    <>
      <h1>Replaces Query param</h1>
    </>
  );
}
