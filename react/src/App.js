import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { Button } from 'react-materialize'
import createHistory from 'history/createBrowserHistory'
import './App.css';
import Home from './comp/LandingPage/Home'
import Dashboard from './comp/Dashboard';
import Services from './comp/Services'
import SingleReg from './comp/regInfo/singleReg'
import TeamReg from './comp/regInfo/teamReg'
import InfoLandingPage from './comp/regInfo/infoLandingPage';



const history = createHistory()

//changes components via the Nav
const changeView = (e, path) => {
	e.preventDefault()
	history.push(path)
}

const ErrorPage = () => (
  <h1>404.. This page is not found!</h1>)

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

  render() {
    return (
      <div className="App">

				<main>

				<Router history={history}>
					<Switch>

						<Route exact path="/" render= {() => <Home
							history={history}/>}/>
            <Route exact path="/Dashboard" render= {() => <Dashboard 
              history={history}/>}/>

						<Route path="/InfoLandingPage" render= {() => <InfoLandingPage
							history={history}/>} />

						<Route path="/SingleReg" render= {() => <SingleReg
							history={history}/>} />

						<Route path="/TeamReg" render= {() => <TeamReg
							history={history}/>} />

						<Route path="*" render= {() => <Home
							history={history}/>}/>
					</Switch>
				</Router>

				</main>
      </div>
    );
  }
}

export default App;
