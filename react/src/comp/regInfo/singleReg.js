import React from 'react'

class SingleReg extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			profileInfo: {}
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

				</div>

				</form>

			</div>
		)
	}
}



export default SingleReg
