import { API_KEY } from "src/constants/config";

export const getTodayWeatherUrlParams = (params: TObject) => {
  const { location, units, lat, lon } = params;
  let paramsUrl = `?APPID=${API_KEY}`

  if (location) paramsUrl+=`&q=${location}`
  if (units) paramsUrl+=`&units=${units}`
  if (lat) paramsUrl+=`&lat=${lat}`
  if (lon) paramsUrl+=`&lon=${lon}`

  return paramsUrl
}

export const getForecasttWeatherUrlParams = (params: TObject) => {
  const { units, lat, lon } = params;
  let paramsUrl = `?APPID=${API_KEY}`

  if (units) paramsUrl+=`&units=${units}`
  if (lat) paramsUrl+=`&lat=${lat}`
  if (lon) paramsUrl+=`&lon=${lon}`
  paramsUrl+='&exclude=minutely,alerts'

  return paramsUrl
}