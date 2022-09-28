import { combineReducers } from 'redux';
import { appEntityReducer } from './app';
import { weatherEntityReducer } from './weather';

const entitiesReducer = combineReducers({
  app: appEntityReducer,
  weather: weatherEntityReducer,
  /**
   * More entity reducers will be added here
   */
});

export { entitiesReducer };
