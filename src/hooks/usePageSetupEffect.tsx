import { useLayoutEffect } from "react";
import { useSearchActions, SearchIntent, UniversalLimit } from "@yext/search-headless-react";
import { executeSearch, getSearchIntents, updateLocationIfNeeded } from "../utils/search-operations";
import { universalResultsConfig } from "../config/universalResultsConfig";

/**
 * Sets up the state for a page
 * @param verticalKey - The verticalKey associated with the page, or undefined for universal pages
 */
export default function usePageSetupEffect(verticalKey?: string, limit?:any) {
  const answersActions = useSearchActions();
  const searchActions = useSearchActions();

  useLayoutEffect(() => {
    const stateToClear = {
      filters: {},
      universal: {},
      vertical: {}
    }
    const key:any = verticalKey;
    answersActions.setState({
      ...answersActions.state,
      ...stateToClear
    });

    if(verticalKey){      
      answersActions.setVertical(verticalKey)
    }else{
      answersActions.setUniversal();
      const universalLimit = {
        'locations' : 10,
        'faqs' : 10,
        'links' : 10
      };
      searchActions.setUniversalLimit(universalLimit);
    }

     
    /* if(verticalKey == key){        
      searchActions.setVerticalLimit(limit);
    } */
      
    const executeQuery = async () => {
      let searchIntents: SearchIntent[] = [];
      if (!answersActions.state.location.userLocation) {
        searchIntents = await getSearchIntents(answersActions, !!verticalKey) || [];
        await updateLocationIfNeeded(answersActions, searchIntents);
      }
      executeSearch(answersActions, !!verticalKey);
    };
    executeQuery();
  }, [answersActions, verticalKey]);
}