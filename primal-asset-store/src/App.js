import Nav from "./components/navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Discover from "./components/pages/Discover";
import About from "./components/pages/About";
import FAQ from "./components/pages/Faq";
import Browse from "./components/pages/Browse";
import ViewProfile from "./components/pages/ViewProfile";
import ViewAccount from "./components/pages/ViewAccount";
import Publish from "./components/pages/Publish";
import PublisherView from "./components/pages/PublisherView";
import AssetView from "./components/pages/AssetView";
import NotFound from "./components/NotFound";
import Cart from "./components/pages/Cart";
import Preview from "./components/elements/Preview";
import AssetsList from "./components/elements/AssetsList";
import Orders from "./components/pages/Orders";

import "./components/stylesheets/Home.css";
import "./App.css";

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
            <Route path="/user/profile" exact component={ViewProfile} />
            <Route path="/user/account" exact component={ViewAccount} />
            <Route path="/user/publish" exact component={Publish} />
            <Route
              path="/user/view/publisher/:userName"
              exact
              component={PublisherView}
            />
            <Route
              path="/user/view/asset/:assetId"
              exact
              component={AssetView}
            />
            <Route path="/about" component={About} />
            <Route path="/faq" component={FAQ} />
            <Route path="/cart" component={Cart} />
            <Route path="/preview" component={Preview} />
            <Route path="/assetslist" component={AssetsList} />
            <Route path="/orders" component={Orders} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
