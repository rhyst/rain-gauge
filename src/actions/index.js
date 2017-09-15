import axios from 'axios';

const ROOT_URL = `https://environment.data.gov.uk/flood-monitoring/id/stations/`;
const RAIN_PARAMS = `/readings?parameter=rainfall&_sorted&_limit=5000`;
const STATION_PARAMS = `?parameter=rainfall&_limit=100&lat=54.119047&long=-2.396646&dist=40`;

export const FETCH_RAIN = 'FETCH_RAIN';
export const FETCH_STATIONS = 'FETCH_STATIONS';

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

export function fetchRain(stationId, lengthTime, lengthDenom) {
    let d = new Date();
    switch (lengthDenom) {
        case "days":
            d.setDate(d.getDate() - lengthTime);
            d.setHours(0)
            d.setMinutes(0);
            break;
        case "hours":
            d.setHours(d.getHours() - lengthTime);
            break;
        case "minutes":
            d.setMinutes(d.getMinutes() - lenghtTime);
            break;
    }
    let sinceDate = d.getFullYear().toString() + "-" + 
                    zeroPad(d.getMonth() + 1, 2) + "-" + 
                    zeroPad(d.getDate(),2) + "T" + 
                    zeroPad(d.getHours(),2) + ":" + 
                    zeroPad(d.getMinutes(),2) + ":00Z";

    const url = `${ROOT_URL}${stationId}${RAIN_PARAMS}&since=${sinceDate}`;
    const request = axios.get(url);

    return {
        type: FETCH_RAIN,
        payload: request
    };
}

export function fetchStations() {
    const url = `${ROOT_URL}${STATION_PARAMS}`;
    const request = axios.get(url);

    return {
        type: FETCH_STATIONS,
        payload: request
    };

}
