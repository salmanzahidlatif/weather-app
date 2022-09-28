import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as weatherIcons from '../../icons.json';
import { useDispatch, useSelector } from 'react-redux';
import { getApiForecastWeatherData, getForecastWeatherData, getTodayWeatherCountry, getTodayWeatherLocation } from 'src/store/selectors/entities/weather';
import { DateRangeSelect } from '../picker/date-range';
import { getFilterWeatherByDateRange } from 'src/utils/common';
import { updateForcastWeatherData } from 'src/store/slices/entities/weather';
import { useTranslation } from 'react-i18next';


export const Forecast: React.FC<IWeatherProps> = ({units}) => {
  const [t] = useTranslation('weather');
  const dispatch = useDispatch();

  const [isShowDatePicker, setIsShowDatePicker] = useState(false)

  const forecast = useSelector(getForecastWeatherData);
  const apiForecastData = useSelector(getApiForecastWeatherData);
  const location = useSelector(getTodayWeatherLocation);
  const country = useSelector(getTodayWeatherCountry);
  const iconPrefix = 'wi wi-';
  const isMetric = units.match(/metric/i) ? true : false;
  const unitDisplay = isMetric ? `C`: 'F'; 
  const icons: TObject = JSON.parse(JSON.stringify(weatherIcons));

  const handleDatepickerModal = () => setIsShowDatePicker((prevState: boolean) => !prevState)

  const handleSelectedDate = (date: TArrayOfObjects) => {
    const {startDate, endDate} = date?.[0]
    const filteredForecastData = getFilterWeatherByDateRange(apiForecastData,startDate,endDate)
    dispatch(updateForcastWeatherData(filteredForecastData));
    handleDatepickerModal();
  }

  return (
    <div className="mt-4 border-t border-green-300">
      <p className='text-2xl font-semibold'>
        <span className='text-gray-500'> {t('weather.weeklyForcast')} </span>
        {location}, {country}
      </p>
      <button
        onClick= { handleDatepickerModal }
        className='text-sm md:text-lg bg-gray-400 flex self-start text-white font-bold py-2 my-2 px-4 rounded'
      >
        {t('weather.filterWeather')}
      </button>
      <DateRangeSelect 
        isShow={isShowDatePicker}
        onSelect = { handleSelectedDate }
      />
      {forecast?.map((item:TObject, index: number) => {
        const currentHour = dayjs(item.date).format('H');
        const isDay = Number(currentHour) > 7 && Number(currentHour) < 19 ? true : false;

        const icon = iconPrefix + icons[isDay ? 'day' : 'night'][item?.icon_id]?.icon;

        return (
            <div  key={item?.date + index} className="mt-4 flex flex-row text-gray-500 p-1">
              <span className="flex-1 text-left">
                {dayjs(item?.date).format('dddd')}
              </span>
              <span className="text-indigo-700 text-xl">
                <span className={icon}></span>
              </span>
              <span className="flex-1 text-right">
                {item?.description}
              </span>
              <span className="flex-1 text-right">
                {item?.min}&deg;{unitDisplay} / {item?.max}&deg;{unitDisplay}
              </span>
            </div>
        );
      })}
    </div>
  );
};
