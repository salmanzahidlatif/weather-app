/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WEATHER } from 'src/constants/weather';
import * as weatherIcons from '../../icons.json';

export const TempratureConverter: React.FC<ITempConverter> = ({
  units,
  handleUnitsChange,
}) => {
  const [t] = useTranslation('weather');

  const [celTemp, setCelTemp] = useState<number>(WEATHER.INITIAL_METRIC_TEMP)
  const [fahTemp, setFahTemp] = useState<number>(WEATHER.INITIAL_IMPERIAL_TEMP)

  const handleCelciusTempUnit = () => handleUnitsChange(WEATHER.METRIC_UNIT);
  const handleFarnhiteTempUnit = () => handleUnitsChange(WEATHER.IMPERIAL_UNIT);
  
  const setInitialTempState = () => {
    setCelTemp(WEATHER.INITIAL_METRIC_TEMP)
    setFahTemp(WEATHER.INITIAL_IMPERIAL_TEMP)
  }

  const handleTempInputChange = (temp: number, unit: string) => {
    if (unit === 'metric' && !isNaN(temp)) {
      setCelTemp(temp)
      setFahTemp(Number(temp*(9/5) + 32))
    } else if (unit !== 'metric' && !isNaN(temp)) {
      setFahTemp(temp)
      setCelTemp(Number(temp - 32) * (5/9))
    } else {
      setInitialTempState
    }
  };

  return (
      <div className='rounded shadow-lg py-1 bg-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none'>
        <p className='tracking-wide text-2xl font-semibold p-2'>
          <span className='text-gray-500'> Temprature Converter </span>
        </p>
        <p className='block px-4 py-4 text-sm text-gray-700'> 
          {t('weather.changeTempratureUnits')} {units}
        </p>
        <div className='flex p-2 justify-center'>
          <div className='flex flex-col m-2 self-center max-w-[46%]'>
            <button
              onClick={handleCelciusTempUnit}
              className={`${units?.match(/metric/i) ? 'bg-blue-600' : 'bg-blue-300'} 
              text-xs md:text-lg hover:bg-blue-600 text-white font-bold py-2 my-2 px-2 rounded`}
            >
              {t('weather.celcius')}
            </button>
            <input
              onChange={(e: TObject) => handleTempInputChange(e.target.value, WEATHER.METRIC_UNIT)}
              value= { celTemp }
              className='outline py-2 px-2 rounded'
          />
          </div>
          <div className='flex flex-col self-center m-2 max-w-[46%]'>
            <button
              onClick={handleFarnhiteTempUnit}
              className={`${units?.match(/metric/i) ? 'bg-blue-300' : 'bg-blue-600'} 
              text-sm md:text-lg hover:bg-blue-600 text-white font-bold py-2 my-2 px-2 rounded `}
            >
              {t('weather.fahrenheit')}
            </button>
            <input
              onChange={(e: TObject) => handleTempInputChange(e.target.value, WEATHER.IMPERIAL_UNIT)}
              value= { fahTemp }
              className='outline py-2 px-2 rounded'
          />
          </div>
        </div>
      </div>
  );
};
