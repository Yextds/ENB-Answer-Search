import { HeadlessConfig } from "@yext/search-headless-react";
export const baseUrl = "https://gainfully-sweeping-puffin.pgsdemo.com";
export const answersHeadlessConfig: HeadlessConfig = {
  apiKey: "91686d707ec23399ba065889efe9e7b5",
  experienceKey: "ephrata-national-bank-answers-react",
  locale: "en",
  experienceVersion: "STAGING",

  endpoints: {
    universalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi.yext.com/v2/accounts/me/answers/filtersearch",
  },
};
