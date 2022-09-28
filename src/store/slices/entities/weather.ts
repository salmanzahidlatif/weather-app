import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'src/constants/redux-slices';


const INITIAL_STATE:TObject = {
  data: {},
};

export const weatherEntitySlice = createSlice({
  name: SLICE_NAME.WEATHER,
  initialState: INITIAL_STATE,
  reducers: {
    updateTodayWeatherData: (state, action) => {
      state.data.todayWeather = {...action.payload };
    },
    addForcastWeatherData: (state, action) => {
      state.data.forcastWeather = [...action.payload ];
      state.data.apiforcastWeather = [...action.payload ];
    },
    updateForcastWeatherData: (state, action) => {
      state.data.forcastWeather = [...action.payload ];
    },
  },
});

export const { updateTodayWeatherData,addForcastWeatherData, updateForcastWeatherData } = weatherEntitySlice.actions;
export const weatherEntityReducer = weatherEntitySlice.reducer;
