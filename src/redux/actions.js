import axios from "axios";
import Actions from "../constants/actions";

const ROOT_URL = `https://environment.data.gov.uk/flood-monitoring/id/stations/`;
const RAIN_PARAMS = `/readings?parameter=rainfall&_sorted&_limit=5000`;
const STATION_PARAMS = `?parameter=rainfall&_limit=100&lat=54.119047&long=-2.396646&dist=40`;

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

export const fetchRain = (
  stationId = 571479,
  lengthTime = 1,
  lengthDenom = "days"
) => async dispatch => {
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
  let sinceDate =
    d.getFullYear().toString() +
    "-" +
    zeroPad(d.getMonth() + 1, 2) +
    "-" +
    zeroPad(d.getDate(), 2) +
    "T" +
    zeroPad(d.getHours(), 2) +
    ":" +
    zeroPad(d.getMinutes(), 2) +
    ":00Z";

  const url = `${ROOT_URL}${stationId}${RAIN_PARAMS}&since=${sinceDate}`;
  const result = await axios.get(url);

  dispatch({
    type: Actions.FETCH_RAIN,
    payload: result.data.items
  });
};

export const fetchStations = () => async dispatch => {
  const url = `${ROOT_URL}${STATION_PARAMS}`;
  const result = await axios.get(url);

  dispatch({
    type: Actions.FETCH_STATIONS,
    payload: result.data.items
  });
};

/*
export function fetchStations() {
  const url = `${ROOT_URL}${STATION_PARAMS}`;
  const request = axios.get(url);

  return {
    type: FETCH_STATIONS,
    payload: request
  };
}

https://environment.data.gov.uk/flood-monitoring/id/stations/571479/readings?parameter=rainfall&_sorted&_limit=5000&since=2019-05-26T00:00:00Z
*/
