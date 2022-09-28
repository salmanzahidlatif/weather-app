/* eslint-disable @typescript-eslint/no-unused-vars */
import { getForecasttWeatherUrlParams, getTodayWeatherUrlParams } from 'src/utils/params';
import { BASE_URL, } from '../../constants/config'
import { mapDataToWeatherInterface } from '../../utils/weather'
import { HttpService } from '../http'
import { prepareErrorResponse } from '../http/response';

export class WeatherService extends HttpService {
  fetchTodayWeather = async (params: TObject): Promise<any> => {
    try {
      console.log('#BASE_URL : ', BASE_URL);
        const url = `${BASE_URL}/weather${getTodayWeatherUrlParams(params)}`
        const response = await fetch(url)
        const apiResponse = await response.json()

        if (response.ok) {
          if (Object.entries(apiResponse).length) {
            return mapDataToWeatherInterface(apiResponse)
          }
        } else {
          const error = new Error(`No results for "${location}"`)
          throw prepareErrorResponse(error);
        }
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };

  fetchForecastWeather = async (params: TObject): Promise<any> => {
    try {
      const url = `${BASE_URL}/onecall${getForecasttWeatherUrlParams(params)}`
      const response = await fetch(url)
      const forecast = await response.json()
    
      if (response.ok) {
        if (forecast?.daily?.length) {
          return forecast.daily.slice(1).map(mapDataToWeatherInterface)
        }
      } else {
        const error = new Error(`No results for "${location}"`)
        throw prepareErrorResponse(error);
      }
    } catch (error) {
      throw prepareErrorResponse(error);
    }
  };
}
