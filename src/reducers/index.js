import { combineReducers } from 'redux';
import RainReducer from './reducer-rain';
import StationReducer from './reducer-stations';
const rootReducer = combineReducers({
  rain: RainReducer,
  stations: StationReducer
});

export default rootReducer;
