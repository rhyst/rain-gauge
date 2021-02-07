import Actions from "../../constants/actions";
import { normalise } from "../../util";

export default function (
  state = {
    data: [],
    loading: false,
    error: false,
    binDuration: parseInt(window.localStorage?.getItem("binDuration")) || 3,
    binDenomination: window.localStorage?.getItem("binDenomination") || "hours",
  },
  action
) {
  switch (action.type) {
    case Actions.FETCH_RAIN:
      return {
        ...state,
        loading: false,
        rawData: action.payload,
        data: normalise(
          action.payload,
          state.binDuration,
          state.binDenomination
        ),
      };
    case Actions.ERROR_RAIN:
      return { ...state, loading: false, error: true };
    case Actions.LOADING_RAIN:
      return { ...state, loading: true };
    case Actions.CLEAR_ERROR_RAIN:
      return { ...state, error: false };
    case Actions.SET_BIN_DURATION:
      return {
        ...state,
        binDuration: parseInt(action.payload),
        data: normalise(
          state.rawData,
          parseInt(action.payload),
          state.binDenomination
        ),
      };
    case Actions.SET_BIN_DENOMINATION: {
      let binDuration = state.binDuration;
      if (state.binDenomination !== "minutes" && action.payload === "minutes") {
        binDuration = 15;
      }
      if (state.binDenomination !== "hours" && action.payload === "hours") {
        binDuration = 3;
      }
      if (state.binDenomination !== "days" && action.payload === "days") {
        binDuration = 1;
      }
      return {
        ...state,
        binDenomination: action.payload,
        binDuration,
        data: normalise(state.rawData, binDuration, action.payload),
      };
    }
  }
  return state;
}
