export const geocodeLocation = async (request: google.maps.GeocoderRequest) => {
    const Geocoder = new google.maps.Geocoder();
    return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      return Geocoder.geocode(request, (geocoderResult, geocoderStatus) => {
        if(geocoderStatus === google.maps.GeocoderStatus.OK){
          return resolve(geocoderResult);
        }else{
          reject(geocoderResult ?? {message:"Request is invalid"})
        }
      })
    })
};

export const getCoordinates = async (address: string) => {
  try {
    const geoLocaion = await geocodeLocation({address});
    return {
      lat: geoLocaion[0].geometry.location.lat(),
      long: geoLocaion[0].geometry.location.lng()
    }
  } catch (err) {
    throw err;
  }
}
