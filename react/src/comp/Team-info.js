
import React, { Component } from 'react';
import "../css/Team-info.css";
// unsure of what kind of data is going to come in, might need to extend Component

const TeamInfo = (props) => {
  // make function to display the users team using forEach instead of hard coding
  const teamDisplay = (props) => {
    return (
      props.forEach(member => {
        <li className="team-member"> member </li>
      })
    )
  }
  return (
    <div className="team-aside-div">
      <h2>
        Your Team Information
      </h2>
      <p className="team-p">
        Teams are Five People
      </p>
      <ol>
        {/* {teamDisplay()} */}
        <li className="team-member"> member </li>
        <li className="team-member"> member </li>
        <li className="team-member"> member </li>
        <li className="team-member"> member </li>
        <li className="team-member"> member </li>
      </ol>
      <button className="add-team-member-btn">
        Add Team Member Here
      </button>
    </div>
  )
}

export default TeamInfo;
