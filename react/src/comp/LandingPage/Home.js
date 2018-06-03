import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import logo from "../../images/logo.png"
import "./Home.css"

class Home extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			signupusername: '',
			signuppassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div>
					<header>
						<h2>Bootcampers Collective</h2>
						<nav>
							<li><a href="#" data-toggle="modal" data-target="#loginModal">Log-in</a></li>
							<li><a href="#" data-toggle="modal" data-target="#signupModal">Sign-up</a></li>
							<li><a href="#">Contact</a></li>
						</nav>
					</header>
					<div>
						<div>
							<section class="hero">
								<div class="background-image"></div>
								<div class="hero-content-area">
									<img src={logo} alt="Bootcampers Collective" id="bootcampersLogo" />
									<h1>Hack-A-Thon</h1>
									{/* <a href="#" class="btn">Contact Us Now</a> */}
								</div>
							</section>
						</div>
					</div>
					<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Log-In</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<form className="form-horizontal">
										<div className="form-group">
											<label className="form-label" htmlFor="username"></label>
											<input className="form-input"
												type="text"
												id="username"
												name="username"
												placeholder="Username"
												value={this.state.username}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label className="form-label" htmlFor="password"></label>
											<input className="form-input"
												placeholder="Password"
												type="password"
												name="password"
												value={this.state.password}
												onChange={this.handleChange}
											/>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" data-dismiss="modal" data-toggle="modal" data-target="#signupModal">Sign Up</button>
									<button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Log In</button>
								</div>
							</div>
						</div>
					</div>
					<div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLabel">Sign up</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<form className="form-horizontal">
										<div className="form-group">
											<label className="form-label" htmlFor="username"></label>
											<input className="form-input"
												type="text"
												id="signupusername"
												name="signupusername"
												placeholder="Username"
												value={this.state.signupusername}
												onChange={this.handleChange}
											/>
										</div>
										<div className="form-group">
											<label className="form-label" htmlFor="password"></label>
											<input className="form-input"
												placeholder="Password"
												type="password"
												name="signuppassword"
												value={this.state.signuppassword}
												onChange={this.handleChange}
											/>
										</div>
									</form>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" onClick={this.handleSubmit}>Sign Up</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}



export default Home;
