import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import homepage from "./pages/homepage";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route component={homepage} path="/" exact />
      </Switch>
    );
  }
}

export default App;
