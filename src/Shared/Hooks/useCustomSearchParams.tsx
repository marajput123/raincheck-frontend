import { useLocation, useSearchParams } from "react-router-dom";
import { constructQueryFromParams, constructUri as _constructUri } from "../Helpers";
import { IAllSearchQuery } from "../Models/ISearchParams";

interface IUseCustomSearchParams {
  getQuery: () => IAllSearchQuery;
}

export const useCustomSearchParams = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamQuery = () => {
    return constructQueryFromParams(searchParams)
  };

  const constructUri = (uriTo = location.pathname, query?: IAllSearchQuery, replaceQuery = false) => {
    const newQuery = replaceQuery ?  {...query} : {...getSearchParamQuery(), ...query}
    return _constructUri(uriTo, newQuery);
  };

  return { getSearchParamQuery, constructUri, searchParams, setSearchParams}  
}