import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'src/components/common/loading';
import NavBar from 'src/components/common/navbar';
import { Map } from 'src/components/map/map';
import Search from 'src/components/search';
import { Forecast } from 'src/components/weather/forecast';
import { TempratureConverter } from 'src/components/weather/temprature-converter';
import {TodayForcast} from 'src/components/weather/today-forcast';
import { WEATHER } from 'src/constants/weather';
import { useGetForecastWeather, useGetTodayWeather } from 'src/hooks';
import { getTodayWeatherLocationLat, getTodayWeatherLocationLng } from 'src/store/selectors/entities/weather';
import { addForcastWeatherData, updateTodayWeatherData } from 'src/store/slices/entities/weather';

export const Dashboard: React.FC = () => {
  const [t] = useTranslation('weather');
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  const [location, setLocation] = useState<TObject>({});
  const [locationParams, setLocationParams] = useState<TObject>({});
  const [tempUnit, setTempUnit] = useState<string>(WEATHER.METRIC_UNIT);

  const { isLoading, data: todayWeather } = useGetTodayWeather({...location, units: tempUnit });
  const { isLoading: isLoadingForecast, data: forcastWeather } = useGetForecastWeather({ ...locationParams, units: tempUnit });

  /** getting lat,long from today res for map & forecast api refetch  */
  const lat = useSelector(getTodayWeatherLocationLat)
  const lon = useSelector(getTodayWeatherLocationLng)

  /** getting current location first time for weather data  */
  useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos: GeolocationPosition) => {
            if (pos?.coords?.latitude && pos?.coords?.longitude) {
              const locationCoordinates = {
                lat: pos?.coords?.latitude,
                lon: pos?.coords?.longitude
              }

              setLocation({ ...locationCoordinates })
              setLocationParams({ ...locationCoordinates })
            }
          },
          () => {
            alert(t('weather.locationPermissionAlert'));
          }
        );
      }
  }, []);
  /** dispatching action to update redux store for today weather data  */

  useEffect(() => {
    if (todayWeather) {
      dispatch(updateTodayWeatherData(todayWeather));
    }
  }, [todayWeather]);
  /** dispatching action to update redux store for forecast weather data  */
  useEffect(() => {
    if (forcastWeather) {
      dispatch(addForcastWeatherData(forcastWeather));
    }
  }, [forcastWeather]);
  /** Setting location after 1 sec to hit the today api  */
  useEffect(() => {
    const setLocationCity = setTimeout(() => {
      if (searchText) {
        setLocation({location: searchText, lat: null, lon: null})
      }
    }, 1000)

    return () => clearTimeout(setLocationCity)
  }, [searchText])
  /** Setting lat,long  for forcast api that only give resukt on lat,long getting from today res */
  useEffect(() => {
      if (lat !== locationParams?.lat && lon !== locationParams?.lon) {
        setLocationParams({...locationParams,lat, lon})
      }
  }, [lat, lon])
  
  const handleLocationChange = (event: TObject) => {
    if (event.target.value) {
      setSearchText(event.target.value)
    }
  }

  const handleUnitsChange = (newUnits: string) => {
    setTempUnit(newUnits)
  }

  return (
    <>
      {(
        <main>
          <div className='container mx-auto w-full'>
          <NavBar />
          <Search
            location={locationParams?.location}
            isSearching={false}
            onLocationChange={handleLocationChange}
          />
          <div className='container mt-5 mx-auto px-2'>
            <div className='md:flex flex-col md:flex-row justify-center'>
              <div className='text-center bg-gray-100 px-5 py-5 md:w-full m-2 rounded'>
                {/* Displaying today forcast whether */}
                { isLoading ? <Loading/> : <TodayForcast units= {tempUnit}/>}
                {/* Displaying days of forcast whether */}
                { isLoadingForecast ? <Loading/> : <Forecast units= {tempUnit}/>}
              </div>
              <div className='text-center md:w-full items-center bg-gray-100 px-5 py-5 m-2 rounded'>
                <TempratureConverter units= {tempUnit} handleUnitsChange={handleUnitsChange}/>
                {/* Render map for whether location*/}
                {locationParams?.lat && locationParams?. lon && 
                  <Map location={{lat,lon}}/>
                }
              </div>
            </div>
          </div>
          </div>
        </main>
      )}
    </>
  )
};
