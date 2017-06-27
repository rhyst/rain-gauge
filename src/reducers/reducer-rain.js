import { FETCH_RAIN } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_RAIN:
            return [ action.payload.data.items, ...state ];
    }
    return state;
}