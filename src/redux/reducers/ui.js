import Actions from "../../constants/actions";

export default function(
  state = { station: "571479", duration: 1, denomination: "days" },
  action
) {
  switch (action.type) {
    case Actions.SET_STATION:
      return { ...state, station: action.payload };
    case Actions.SET_DURATION:
      return { ...state, duration: action.payload };
    case Actions.SET_DENOMINATION:
      return { ...state, denomination: action.payload };
    default:
      return state;
  }
}
