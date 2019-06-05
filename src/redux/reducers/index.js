import { combineReducers } from "redux";
import rain from "./rain";
import stations from "./stations";

export default combineReducers({ rain, stations });
