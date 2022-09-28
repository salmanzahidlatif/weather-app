import { combineReducers } from 'redux';
import { appFeatureReducer } from './app';
import { weatherFeatureReducer } from './weather';


const featuresReducer = combineReducers({
  app: appFeatureReducer,
  weather: weatherFeatureReducer,
  /**
   * More feature reducers will be added here
   */
});

export { featuresReducer };
