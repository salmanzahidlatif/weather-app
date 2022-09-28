import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { DateRange } from 'react-date-range';
import { getWindowDimension } from "src/utils/layout";

export const DateRangeSelect: React.FC<TObject> = ({ onSelect, isShow }) => {

  const intialPickerstate = {
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 7),
    key: "selection",
  }

  const [selectedDate, setSelectedDate] = useState([intialPickerstate]);

  const [width, setWidth ] =useState( getWindowDimension()?.width )

  const handleResize = () => {
    setWidth(getWindowDimension()?.width)
  }

  useEffect (()=> {
    window.addEventListener('resize', handleResize, false)
    return () => window.removeEventListener('resize', handleResize, false)
  }, []) 

  const handleDateChange = (date: TObject) => setSelectedDate(date);

  const resetDateRange = () => {
    setSelectedDate([intialPickerstate]);
    onSelect([intialPickerstate]);
  };

  const selectDate = () => {
    onSelect(selectedDate);
  };

  return (
    <div 
      className={`${ isShow ? "block" : "hidden" } 
      overflow-y-auto overflow-x-hidden fixed top-[10%] md:left-1/3 z-50`}
    >
      <div className="bg-white rounded-lg pt-2  light:transparent">
        { width > 480 ? 
          <DateRangePicker
            className="rounded"
            onChange={(item: TObject) => handleDateChange([item.selection])}
            moveRangeOnFirstSelection={false}
            minDate={addDays(new Date(), 1)}
            maxDate={addDays(new Date(), 7)}
            ranges={selectedDate}
            direction="horizontal"
          /> : 
          <DateRange
            className="rounded"
            onChange={(item: TObject) => handleDateChange([item.selection])}
            moveRangeOnFirstSelection={false}
            minDate={addDays(new Date(), 1)}
            maxDate={addDays(new Date(), 7)}
            ranges={selectedDate}
            direction="horizontal"
          />
        }
        <div className="flex justify-end items-start rounded-b-lg border-t">
            <button
              onClick={resetDateRange}
              className={`bg-gray-300 text-sm text-black py-1.5 m-2 px-4 rounded-lg font-bold`}
            >
              Reset
            </button>
            <button
              onClick={selectDate}
              className={`bg-blue-600 text-sm text-white py-1.5 m-2 px-4 rounded-lg font-bold`}
            >
              Apply
            </button>
        </div>
      </div>
    </div>
  );
};
