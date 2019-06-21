import axios from "axios";
import Actions from "../constants/actions";

const ROOT_URL = `https://environment.data.gov.uk/flood-monitoring/id/stations/`;
const RAIN_PARAMS = `/readings?parameter=rainfall&_sorted&_limit=5000`;
// Gets nearest statons to arbitrary point in Yorkshire
const STATION_PARAMS = `?parameter=rainfall&_limit=100&lat=54.119047&long=-2.396646&dist=40`;

export const fetchRain = (
  stationId = 571479,
  lengthTime = 1,
  lengthDenom = "days"
) => async dispatch => {
  dispatch({ type: Actions.LOADING_RAIN });
  try {
    let d = new Date();
    switch (lengthDenom) {
      case "days":
        d.setDate(d.getDate() - lengthTime);
        d.setHours(0);
        d.setMinutes(0);
        break;
      case "hours":
        d.setHours(d.getHours() - lengthTime);
        break;
      case "minutes":
        d.setMinutes(d.getMinutes() - lengthTime);
        break;
    }
    let sinceDate = d.toISOString();

    const url = `${ROOT_URL}${stationId}${RAIN_PARAMS}&since=${sinceDate}`;
    const result = await axios.get(url);

    dispatch({
      type: Actions.FETCH_RAIN,
      payload: result.data.items
    });
  } catch (e) {
    dispatch({ type: Actions.ERROR_RAIN });
  }
};

export const clearRainError = () => ({ type: Actions.CLEAR_ERROR_RAIN });

export const fetchStations = () => async dispatch => {
  dispatch({ type: Actions.LOADING_STATIONS });
  try {
    const url = `${ROOT_URL}${STATION_PARAMS}`;
    const result = await axios.get(url);

    dispatch({
      type: Actions.FETCH_STATIONS,
      payload: result.data.items
    });
  } catch (e) {
    dispatch({ type: Actions.ERROR_STATIONS });
  }
};

export const setStation = station => ({
  type: Actions.SET_STATION,
  payload: station
});

export const setDuration = duration => ({
  type: Actions.SET_DURATION,
  payload: duration
});

export const setDenomination = denomination => ({
  type: Actions.SET_DENOMINATION,
  payload: denomination
});
