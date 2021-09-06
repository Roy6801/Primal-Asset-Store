import React from "react";
import "./App.css";
import Nav from "./components/navigation/Nav";
import SubNav from "./components/navigation/SubNav";
import Footer from "./components/navigation/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Discover from "./components/pages/Discover";
import Game from "./components/pages/Game";
import About from "./components/pages/About";
import FAQ from "./components/pages/Faq";
import Browse from "./components/pages/Browse";

import "./components/stylesheets/Home.css";

const App = () => {
  return (
    <div className="screen">
      <Router>
        <Nav />
        <div className="screen-pager">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/ui"
              exact
              render={(props) => <Discover assetType="ui" {...props} />}
            />
            <Route
              path="/game"
              exact
              render={(props) => <Discover assetType="game" {...props} />}
            />
            <Route
              path="/ui/browse"
              exact
              render={(props) => <Browse assetType="ui" {...props} />}
            />
            <Route
              path="/game/browse"
              exact
              render={(props) => <Browse assetType="game" {...props} />}
            />
            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
