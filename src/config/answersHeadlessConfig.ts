
import {
  provideHeadless,
  HeadlessConfig,
  SandboxEndpoints,
} from "@yext/search-headless-react";

export let answersHeadlessConfig: HeadlessConfig = {
  apiKey: "91686d707ec23399ba065889efe9e7b5",
  experienceKey: "ephrata_national_bank_answers",
  locale: "en",
  experienceVersion: "STAGING",
  
  // sessionTrackingEnabled: true,
  endpoints: {
    universalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/query",
    verticalSearch: "https://liveapi.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission: "https://liveapi.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete: "https://liveapi.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete: "https://liveapi.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch: "https://liveapi.yext.com/v2/accounts/me/answers/filtersearch"
  },
};

