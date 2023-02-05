type IFindPlaceCallback = (result: google.maps.places.QueryAutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => void

export const googleAutocomplete = (searchQueryRequest: google.maps.places.QueryAutocompletionRequest, callback: IFindPlaceCallback) => {
  const google = window.google;
  const service = new google.maps.places.AutocompleteService();
  return service.getQueryPredictions(searchQueryRequest, callback);
}