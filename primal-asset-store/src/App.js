import React from 'react';
import './App.css';
import Nav from "./components/navigation/Nav";
import SubNav from "./components/navigation/SubNav";
import Footer from "./components/navigation/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import UI from "./components/pages/UI";
import Game from "./components/pages/Game";
import About from "./components/pages/About";
import FAQ from "./components/pages/Faq";

import "./components/stylesheets/Home.css";

const App = () => {
  return (
    <div className="screen">
      <Router>
        <Nav />
        <div className="screen-sub-nav">
          <SubNav />
        </div>
        <div className="screen-pager">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/ui" component={UI} />
            <Route path="/game" component={Game} />
            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;




