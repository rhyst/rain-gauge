import Actions from "../../constants/actions";

export default function(
  state = { stations: [], stationsCentre: { lat: 54.119047, lng: -2.396646 } },
  action
) {
  switch (action.type) {
    case Actions.FETCH_STATIONS:
      return { ...state, stations: action.payload };
    case Actions.SET_STATIONS_CENTRE:
      return { ...state, stationsCentre: action.payload };
  }
  return state;
}
