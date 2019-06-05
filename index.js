import React from "react";
import { render } from "react-dom";
/* eslint-disable-next-line no-unused-vars */
import bulma from "bulma";
import { Provider } from "react-redux";
import store from "./src/redux/store";

import App from "./src/app";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
