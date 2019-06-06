import Actions from "../../constants/actions";

export default function(
  state = { data: [], loading: false, error: false },
  action
) {
  switch (action.type) {
    case Actions.FETCH_RAIN:
      return {
        ...state,
        loading: false,
        data: action.payload
          .map(item => ({
            y: item.value,
            x: item.dateTime
          }))
          .reverse()
      };
    case Actions.ERROR_RAIN:
      return { ...state, loading: false, error: true };
    case Actions.LOADING_RAIN:
      return { ...state, loading: true };
    case Actions.CLEAR_ERROR_RAIN:
      return { ...state, error: false };
  }
  return state;
}
