import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryById, resetCountryById } from "../redux/actions";

export const CountryDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const country = useSelector((state) => state.countryById);

  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);

  const durationToString = (duration) => {
    switch (duration) {
      case "1":
        return "30 minutes or less";
      case "2":
        return "1 hour";
      case "3":
        return "2 hours";
      case "4":
        return "3 hours";
      case "5":
        return "More than 4 hours";

      default:
        break;
    }
  };

  const difficultyToString = (duration) => {
    switch (duration) {
      case "1":
        return "Very easy";
      case "2":
        return "Easy";
      case "3":
        return "Intermediate";
      case "4":
        return "Difficult";
      case "5":
        return "Very difficult";

      default:
        break;
    }
  };

  const handleClick = (e) => {
    dispatch(resetCountryById());
  };

  return (
    <div
      className="backgroundimage"
      style={{
        background: `url(${country.image})`,
      }}
    >
      <Link className="button" onClick={handleClick} to="/countries/home">
        <button>Back</button>
      </Link>

      <div className="country-details-container">
        <div className="image-container">
          <img src={country.image} alt={country.name} />
        </div>

        <div className="description-container">
          <h1>{country.name}</h1>
          <div className="description-grid">
            <div>
              <h3>Continent</h3>
              <p>{country.continent}</p>
            </div>
            <div>
              <h3>Subregion</h3>
              <p>{country.subregion}</p>
            </div>
            <div>
              <h3>Population</h3>
              <p>{country.population}</p>
            </div>
            <div>
              <h3>Capital</h3>
              <p>{country.capital}</p>
            </div>
            <div>
              <h3>Area</h3>
              <p>{country.area}</p>
            </div>
          </div>
        </div>

        <div className="activities-container">
          {country.activities?.length >= 1 ? (
            <>
              <h2>Activities</h2>
              <div className="border">
                <div>
                  <p>Name</p>
                </div>

                <div>
                  <p>Duration</p>
                </div>

                <div>
                  <p>Season</p>
                </div>

                <div>
                  <p>Difficulty</p>
                </div>
              </div>

              {country.activities.map((e) => {
                return (
                  <div className="border" key={e.id}>
                    <div>
                      <p>{e.name}</p>
                    </div>
                    <div>
                      <p>{durationToString(e.duration)}</p>
                    </div>
                    <div>
                      <p>{e.season}</p>
                    </div>
                    <div>
                      <p>{difficultyToString(e.difficulty)}</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <h2>No hay actividades</h2>
          )}
        </div>
      </div>
    </div>
  );
};
