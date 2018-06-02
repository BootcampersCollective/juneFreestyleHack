// import React, { Component } from 'react'; 

<<<<<<< HEAD
class TeamReg extends Component {
	constructor(props) {
		super(props);
		this.state= { 
			teamInfo: {}
		}
	}
	

	fillInfo(info, key) {
		const teamInfo = this.state.teamInfo
		teamInfo[key] = info; 

		this.setState({
			teamInfo: teamInfo
		}); 

		console.log(this.state);
	}


	render(){
		return (
			<div id="teamInfo">
				<h2>Team Registration</h2>
				<input type="text" placeholder="First and Last" onChange={(e) => this.fillInfo(e.target.value, "name")}/>
				<input type="text" placeholder="email" onChange={(e) => this.fillInfo(e.target.value, "email")}/>
				<input type="text" placeholder="teamName" onChange={(e) => this.fillInfo(e.target.value, "teamName")}/>
				<button id="submit">Submit</button> 
			</div>

			)
	}
}

export default TeamReg; 
=======
// class TeamReg extends Component {
// 	constructor(props) {
// 		super(props); 

// 	}

// 	render(){
// 		return (

// 			)
// 	}
// }
>>>>>>> ca6dcab1775e963316bdf34ffa31db48657628cd
