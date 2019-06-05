import Actions from "../../constants/actions";

export default function(state = [], action) {
  switch (action.type) {
    case Actions.FETCH_RAIN:
      return action.payload
        .map(item => ({
          y: item.value,
          x: item.dateTime
        }))
        .reverse();
  }
  return state;
}
