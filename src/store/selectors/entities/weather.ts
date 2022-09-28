import { createSelector } from 'reselect';
import { formateUTCDateWithTimezone } from 'src/utils/date';
/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */
 
const weatherEntitySelector = (state: TReduxState) => state?.entities?.weather

export const getTodayWeatherData = createSelector(weatherEntitySelector, weather => weather?.data?.todayWeather);

export const getTodayWeatherDate = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['date'] || '');

export const getTodayWeatherTimezone = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['timezone'] || '');

export const getTodayWeatherSunrise = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['sunrise'] || '');

export const getTodayWeatherSunset = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['sunset'] || '');

export const getFormatedTodayWeatherSunrise = createSelector(getTodayWeatherSunrise, getTodayWeatherTimezone,
  (sunrise, timezone) => formateUTCDateWithTimezone(sunrise, timezone)
);

export const getFormatedCurrentTime = createSelector(getTodayWeatherDate, getTodayWeatherTimezone,
  (date, timezone) => formateUTCDateWithTimezone(date, timezone)
);


export const getFormatedTodayWeatherSunset = createSelector(getTodayWeatherSunset, getTodayWeatherTimezone,
  (sunset, timezone) => formateUTCDateWithTimezone(sunset, timezone)
);
  
export const getIsDay = createSelector(getFormatedCurrentTime, getFormatedTodayWeatherSunrise, getFormatedTodayWeatherSunset,
  (currentTime, sunrise, sunset) => { 
   return currentTime > sunrise && currentTime < sunset ? true : false
  }
);

export const getTodayWeatherDescription = createSelector(getTodayWeatherData, todayWeather => 
  todayWeather?.['description']?.charAt(0)?.toUpperCase() + todayWeather?.['description']?.slice(1) || '');

export const getTodayWeatherLocation = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['location'] || '');
export const getTodayWeatherLocationLat = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['lat'] || '');
export const getTodayWeatherLocationLng = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['lon'] || '');

export const getTodayWeatherCountry = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['country'] || '');

export const getTodayWeatherTemprature = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['temperature'] || '');

export const getTodayWeatherFeelsLike = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['feels_like'] || '');

export const getTodayWeatherWindSpeed = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['wind_speed'] || '');

export const getTodayWeatherHumidity = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['humidity'] || '');

export const getTodayWeatherIconId = createSelector(getTodayWeatherData, todayWeather => todayWeather?.['icon_id'] || '');

export const getForecastWeatherData = createSelector(weatherEntitySelector, weather => weather?.data?.forcastWeather);
export const getApiForecastWeatherData = createSelector(weatherEntitySelector, weather => weather?.data?.apiforcastWeather);