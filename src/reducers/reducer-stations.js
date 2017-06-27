import { FETCH_STATIONS } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_STATIONS:
            return [ action.payload.data.items, ...state ];
    }
    return state;
}