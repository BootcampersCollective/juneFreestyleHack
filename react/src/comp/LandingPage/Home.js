import React from 'react'
import logo from "../../images/logo.png"
import "./Home.css"

const Home = () => {

	return (
		<div>
			<header>
				<h2><a href="#">Bootcampers Collective</a></h2>
				<nav>
					<li><a href="#">Log-in</a></li>
					<li><a href="#">Sign-up</a></li>
					<li><a href="#">Contact</a></li>
				</nav>
			</header>
			<div class="row" id="row2">
				<div class="col-sm" id="landingbody">
					<section class="hero">
						<div class="background-image"></div>
						<div class="hero-content-area">
							<img src={logo} alt="Bootcampers Collective" />
							<h3>Hack-A-Thon</h3>
							{/* <a href="#" class="btn">Contact Us Now</a> */}
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}



export default Home
