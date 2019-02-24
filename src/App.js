import React, { Component } from 'react';
//import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import DashBoard from './components/dashboard';
import UserPage from './components/auth/UserPage';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className='App'>
					<NavBar />
					<Switch>
						<Route exact path='/' component={DashBoard} />
						<Route path='/signin' component={SignIn} />
						<Route path='/signup' component={SignUp} />
						<Route path='/userpage' component={UserPage} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
