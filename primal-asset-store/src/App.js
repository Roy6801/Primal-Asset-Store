import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import UI from './components/pages/UI';
import Game from './components/pages/Game';
import About from './components/pages/About';
import FAQ from './components/pages/Faq';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import Preview from "./components/pages/Preview";
import AssetsList from "./components/pages/AssetsList";


function App() {
return (
	<Router>
	<div>
	<Navbar />
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/ui' component={UI} />
		<Route path='/game' component={Game} />
		<Route path='/about' component={About} />
		<Route path='/faq' component={FAQ} />
		<Route path="/preview" component={Preview} />
        <Route path="/assetslist" component={AssetsList} />
		<Route path='/components/Login' component={Login} />
	</Switch>
	<Navbar />
	</div>

	<div>
	<Switch>
		<Route path='/SearchBar' component={SearchBar} />
	</Switch>
	</div>
	</Router>
	
);
}

export default App;




