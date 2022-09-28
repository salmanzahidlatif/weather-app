/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react'
import 'weather-react-icons/lib/css/weather-icons.css';
import * as weatherIcons from '../../icons.json'
import { useSelector } from 'react-redux'
import { 
    getTodayWeatherCountry,
    getTodayWeatherDate,
    getTodayWeatherDescription, 
    getTodayWeatherHumidity, 
    getTodayWeatherLocation, 
    getTodayWeatherTimezone, 
    getTodayWeatherWindSpeed, 
    getTodayWeatherTemprature, 
    getTodayWeatherFeelsLike, 
    getIsDay, 
    getTodayWeatherIconId
  } from 'src/store/selectors/entities/weather'
import { formateUTCDateWithTimezone } from 'src/utils/date';
import { useTranslation } from 'react-i18next';

export const TodayForcast: FC<IWeatherProps> = ({units}) => {
  const [t] = useTranslation('weather');

  const date = useSelector(getTodayWeatherDate);
  const timezone = useSelector(getTodayWeatherTimezone);
  const isDay = useSelector(getIsDay);
  const description = useSelector(getTodayWeatherDescription);
  const location = useSelector(getTodayWeatherLocation);
  const country = useSelector(getTodayWeatherCountry);
  const temperature = useSelector(getTodayWeatherTemprature);
  const feelsLike = useSelector(getTodayWeatherFeelsLike);
  const windSpeed = useSelector(getTodayWeatherWindSpeed);
  const humidity = useSelector(getTodayWeatherHumidity);
  const weatherIcon = useSelector(getTodayWeatherIconId);

  const iconPrefix = `wi wi-`
  const isMetric = units?.match(/metric/i) ? true : false;
  const unitDisplay = isMetric ? 'C': 'F'; 
  const icons: TObject = JSON.parse(JSON.stringify(weatherIcons));
  const icon = iconPrefix + icons[isDay ? 'day' : 'night']?.[weatherIcon]?.icon;

  return (
    <>
      <div>
        <p className='tracking-wide text-2xl font-semibold'>
          <span className='text-gray-500'>{t('weather.todayForcast')}</span>
          {location}, {country}
        </p>
        <p className='text-gray-500 tracking-wide'>
          {formateUTCDateWithTimezone(date, timezone, 'dddd')},{' '}
          {formateUTCDateWithTimezone(date, timezone, 'h:mm A')}, {description}
        </p>
      </div>
      <div className='flex flex-row justify-between my-8 lg:my-4 text-5xl lg:text-6xl tracking-wide'>
        <span className='mt-6 md:mt-10 text-gray-500 font-light'>
          {temperature} &deg; {unitDisplay}
          <span className='flex flex-col text-gray-500 font-normal tracking-wide text-base mt-1'>
          {t('weather.feelsLike')} {feelsLike} &deg; {unitDisplay}
          </span>{' '}
        </span>
        <div className='text-8xl sm:text-9xl mt-4 text-indigo-700'>
          <span className={icon}></span>
        </div>
      </div>
      <div className='text-indigo-700 mt-1'>
        <span className='wi wi-strong-wind text-xl'></span>
        <span className='ml-1 mr-2 text-gray-500 tracking-wide'>
          {windSpeed}
          {isMetric ? `m/s` : `mph`} {t('weather.winds')}
        </span>
        <span className='wi wi-humidity text-xl'></span>
        <span className='ml-1 text-gray-500 tracking-wide'>
          {humidity}% {t('weather.humidity')}
        </span>
      </div>
    </>
  )
}
