import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import {Provider} from "./config/Context";

ReactDOM.render(
  <Provider>
    <Routes />
  </Provider>
, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}