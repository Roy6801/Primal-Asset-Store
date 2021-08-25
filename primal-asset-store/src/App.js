import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import UI from './Pages/Ui';
import Game from './Pages/Game';
import About from './Pages/About';
import FAQ from './Pages/Faq';
import Login from './components/Login';
import SearchBar from './Pages/SearchBar';

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




