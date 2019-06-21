import { combineReducers } from "redux";
import rain from "./rain";
import stations from "./stations";
import ui from "./ui";

export default combineReducers({ rain, stations, ui });
