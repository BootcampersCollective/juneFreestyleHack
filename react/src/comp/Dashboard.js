import React from 'react';
import Header from './Header';
import TeamInfo from "./Team-info";
import Skills from "./Skills";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <TeamInfo />
      <Skills />
    </div>
  )
}

export default Dashboard