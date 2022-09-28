import { useQuery } from "react-query";
import { WeatherService } from "src/services";

const weatherService = new WeatherService();

/**
 * Perform api call using useQuery hook to fetch data from server
 */
const useGetTodayWeather = (params: TObject) => {
  const { location, lat, lon } = params;
  // A query can be used with any Promise based method (including GET methods) to fetch data from a server
  return useQuery(['today-weather', params], 
  () => { 
    if (location || lat || lon) {
      return weatherService.fetchTodayWeather(params) 
    }
    },
  { retry: false, refetchOnWindowFocus: false, keepPreviousData: true });
};

const useGetForecastWeather = (params: TObject) => {
  const { lat, lon } = params;
  return useQuery(['forecast-weather', params], 
  () => { 
    if ( lat && lon) {
      return weatherService.fetchForecastWeather(params) 
    }
    },
  { retry: false, refetchOnWindowFocus: false, keepPreviousData: true });
};

export { useGetTodayWeather, useGetForecastWeather };
