import Actions from "../../constants/actions";

export default function(state = [], action) {
  switch (action.type) {
    case Actions.FETCH_STATIONS:
      return action.payload;
  }
  return state;
}
