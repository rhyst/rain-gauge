import Actions from "../../constants/actions";

export default function (
  state = {
    station: window.localStorage?.getItem("station") || "571479",
    duration: parseInt(window.localStorage?.getItem("duration")) || 5,
    denomination: window.localStorage?.getItem("denomination") || "days",
  },
  action
) {
  switch (action.type) {
    case Actions.SET_STATION:
      return { ...state, station: action.payload };
    case Actions.SET_DURATION:
      return { ...state, duration: parseInt(action.payload) };
    case Actions.SET_DENOMINATION:
      return { ...state, denomination: action.payload };
    default:
      return state;
  }
}
