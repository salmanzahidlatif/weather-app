import { createSelector } from 'reselect';
import { WEATHER } from 'src/constants/weather';
/**
 *
 * @param state
 * Implementation of memoized selectors using reselect to get particular data out of store.
 */
 
const weatherFeatureSelector = (state: TReduxState) => state?.features?.weather

export const getTempUnit = createSelector(weatherFeatureSelector, weather => 
  weather?.data?.tempWeather || WEATHER?.METRIC_UNIT);
