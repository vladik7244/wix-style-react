/*eslint camelcase: off*/
export function google2address(google) {
  const components = {};
  google.address_components.forEach(({types, long_name, short_name}) => {
    types.forEach(type => {
      components[type] = {long_name, short_name};
    });
  });

  const locality = components.locality || components.sublocality || components.postal_town;
  const result = {
    formatted: google.formatted_address,
    latLng: {
      lat: google.geometry.location.lat(),
      lng: google.geometry.location.lng()
    },
    approximate: (!(google.types || []).includes('street_address') && (!(google.types || []).includes('premise'))),
    city: locality && locality.long_name,
    state: components.administrative_area_level_1 && components.administrative_area_level_1.short_name,
    country: components.country && components.country.long_name,
    countryCode: components.country && components.country.short_name,
    street: components.route && components.route.long_name,
    number: components.street_number && components.street_number.long_name,
    postalCode: components.postal_code && components.postal_code.long_name
  };

  for (const key in result) {
    if (result[key] === undefined) {
      delete result.key;
    }
  }

  return result;
}
