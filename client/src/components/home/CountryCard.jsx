import React from "react";
import { Link } from "react-router-dom";

export const CountryCard = ({ countries }) => {

  return (
    <>
      {countries.map((country) => {
        return (
          <Link key={country.id} to={`/countries/details/${country.id}`}>
            <div className="country-card">
              <div>
                <img src={country.image} alt={`Flag of ${country.name}`} />
              </div>

              <div>
                <h3>{country.name}</h3>
                <p>{country.continent}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
};
