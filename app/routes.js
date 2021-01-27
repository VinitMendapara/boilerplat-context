import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/LoginModel";
import Header from "./components/Header";
import { createBrowserHistory } from "history";
import { Footer } from "antd/lib/layout/layout";

const history = createBrowserHistory();

export default function routes() {
  return (
    <Router  history={history}>
      <React.Fragment>
        <Header  history={history}/>
        <div className="mainContainer">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
          <Footer style={{ textAlign: 'center' }}>©2020 Company Name</Footer>
        </div>
      </React.Fragment>
    </Router>
  );
}
