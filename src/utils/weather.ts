/* Mapped get whether values in object */
export const mapDataToWeatherInterface = (data: TObject) => {

  const mapped:TObject = {
    location: data?.name,
    lat: data?.coord?.lat,
    lon: data?.coord?.lon,
    condition: data?.cod,
    country: data?.sys?.country,
    date: data?.dt * 1000, // convert from seconds to milliseconds
    description: data?.weather?.[0]?.description,
    feels_like: Math.round(data?.main?.feels_like),
    humidity: data?.main?.humidity,
    icon_id: data?.weather?.[0]?.id,
    sunrise: data?.sunrise ? data?.sunrise * 1000: data?.sys?.sunrise * 1000, // convert from seconds to milliseconds
    sunset: data?.sunset ? data?.sunset * 1000: data?.sys?.sunset * 1000, // convert from seconds to milliseconds
    temperature:Math?.round(data?.main?.temp),
    timezone: data?.timezone / 3600, // convert from seconds to hours
    wind_speed: data?.wind_speed ? Math.round(data?.wind_speed * 3.6) : Math.round(data?.wind?.speed * 3.6), // convert from m/s to km/h
  }

  // Add extra properties for the five day forecast: dt_txt, icon, min, max
  if (data?.dt_txt) {
    mapped.dt_txt = data.dt_txt
  }

  if (data?.weather?.[0]?.icon) {
    mapped.icon = data.weather[0].icon
  }

  if (data?.temp?.min && data?.temp?.max) {
    mapped.max = Math.round(data?.temp?.min)
    mapped.min = Math.round(data?.temp?.max)
  }

  // remove undefined fields
  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key],
  )

  return mapped
}
