import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'src/constants/redux-slices';
import { WEATHER } from 'src/constants/weather';


const INITIAL_STATE:TObject = {
  data: {
    tempUnits: WEATHER.METRIC_UNIT
  },
};

export const weatherFeatureSlice = createSlice({
  name: SLICE_NAME.WEATHER,
  initialState: INITIAL_STATE,
  reducers: {
    updateTempratureUnit: (state, action) => {
      // console.log('#action.payload : ',action.payload)
      state.data.tempUnits = action.payload;
    },
  },
});

export const { updateTempratureUnit } = weatherFeatureSlice.actions;
export const weatherFeatureReducer = weatherFeatureSlice.reducer;
