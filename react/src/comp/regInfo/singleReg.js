import React from 'react'

class SingleReg extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			profileInfo: {skills:[{title:"",rank:""}]},
			currentSkill: {}
		}
	}

	fillInfo(info, key) {
		const profileInfo = this.state.profileInfo
		profileInfo[key] = info

		this.setState({
			profileInfo: profileInfo
		})

		console.log(this.state);
	}

	fillSkill(info, key) {
		const currentSkill = this.state.currentSkill
		currentSkill[key] = info

		this.setState({
			currentSkill: currentSkill
		})
	}

	render () {
		return(
			<div>
				<form>
				<div id="generalInfo">

					<input type="text" placeholder="First and Last" onChange={(e) => this.fillInfo(e.target.value, "name")}/>

					<input type="text" placeholder="City in Colorado" onChange={(e) => this.fillInfo(e.target.value, "location")}/>
				</div>

				<div id="deepInfo">
					<textarea placeholder="Goals" onChange={(e) => this.fillInfo(e.target.value, "goals")}/>
					<select/>
					<div id="skillInfo">
			
						{this.state.profileInfo.skills.map((data) => {
							return (<div>
								<input type="text" placeholder="Skill" value={data.title} onChange={(e) => this.fillSkill(e.target.value, "title")}/>

								<input type="text" placeholder="Skill Rank" value={data.rank} onChange={(e) => this.fillSkill(e.target.value, "rank")}/>

								<button> Add Skill </button>
							</div>)
						})}
					</div>
				</div>

				</form>

			</div>
		)
	}
}



export default SingleReg
