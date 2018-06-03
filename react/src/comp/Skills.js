import React from 'react';
import "../css/Skills.css";

const Skills = () => {
  // make function to display the users skills using forEach/map
  return (
    <div className="skills-div">
      <h2>
        Skills
      </h2>
      <ul className="skills-ul">
        <li>JavaScript</li>
        <li>Java</li>
        <li>Java</li>
        <li>Java</li>
        <li>Java</li>
      </ul>
      <button className="add-skill">
        Add New Skill
      </button>
    </div>
  )
}

export default Skills;