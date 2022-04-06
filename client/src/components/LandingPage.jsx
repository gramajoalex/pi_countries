import React from "react";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-info-container">
        <h1>Countries app</h1>
        <p>
          Single page application created to visualize the data of the countries
          and their activities. It was made using React, Redux, Node, Express,
          PostgreSQL and SASS
        </p>
        <Link to="/countries/home">
          <button>Search countries</button>
        </Link>
      </div>
    </div>
  );
};
