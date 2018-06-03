import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { Button } from 'react-materialize'
import createHistory from 'history/createBrowserHistory'
import logo from './logo.svg';
import './App.css';
import Home from './comp/Home'
import Services from './comp/Services'

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

						<Route path="/Services" render= {() => <Services
							history={history}/>} />

						<Route path="*" component={ErrorPage} />
					</Switch>
				</Router>

				<div>
					<Button onClick = {(e) => changeView(e, "/Services")}>Tour</Button>
				</div>

				</main>
      </div>
    );
  }
}

export default App;
