import React from 'react';
import "../css/Team-info.css";

const TeamInfo = () => {
  return (
    <div className="team-aside-div"  role="aside">
        <h2>
          Your Team Information
        </h2>
        <p className="team-p">
          Teams are Five People Big
        </p>
        <ol>
          <li className="team-member one">Emily</li>
          <li className="team-member two">Sal</li>
          <li className="team-member three">Megan</li>
          <li className="team-member four"></li>
          <li className="team-member five"></li>
        </ol>
        <button className="add-team-member-btn">
          Add Team Member Here
        </button>
    </div>
  )
}

export default TeamInfo;
