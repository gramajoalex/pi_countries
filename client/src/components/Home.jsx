// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  filterByActivity,
  filterByContinent,
  getActivities,
  getCountries,
  getCountryByName,
  order,
} from "../redux/actions/index";
import { CountryCard } from "./home/CountryCard";
import { Pagination } from "./home/Pagination";

export const Home = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const activities = useSelector((state) => state.activities);
  // -------SEARCH INPUT--------
  const [searchInput, setSearchInput] = useState("");

  // --------PAGINATION--------
  // Esto trae solo los paises requeridos en base al numero de pagina
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const lastCountryLoaded = currentPage * countriesPerPage;
  const indexFirstCountry = lastCountryLoaded - countriesPerPage;
  const currentCountries = () => {
    if (currentPage === 1) {
      return countries.slice(indexFirstCountry, lastCountryLoaded - 1);
    } else {
      return countries.slice(indexFirstCountry - 1, lastCountryLoaded - 1);
    }
  };

  // Esto maneja la navegacion del paginado
  const paginate = (pageNumber) => {
    return setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  // Input's handlers
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountryByName(searchInput));
    setSearchInput("");
  };

  const handleOrder = (e) => {
    dispatch(order(e.target.value));
  };

  const handleFilterByContinent = (e) => {
    dispatch(filterByContinent(e.target.value));
  };

  const handleFilterByActivity = (e) => {
    dispatch(filterByActivity(e.target.value));
  };

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getCountries());
  };

  return (
    <div>
      <div className="home-nav">
        <Link to="/">
          <h1>CountriesApp</h1>
        </Link>

        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            name="search"
            value={searchInput}
            onChange={handleInput}
            placeholder="Search country"
            autoComplete="off"
          />
        </form>

        <Link
          className="create-activity-button"
          to="/countries/create-activity"
        >
          <button>Create Activity</button>
        </Link>
      </div>

      <div className="world-background">
        <div className="filters">
          <select name="order" onChange={(e) => handleOrder(e)}>
            <option value="">Order</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>

          <select name="filter" onChange={(e) => handleFilterByContinent(e)}>
            <option value="">Continents</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Oceania">Oceania</option>
            <option value="Antarctica">Antarctica</option>
          </select>

          <select name="activities" onChange={(e) => handleFilterByActivity(e)}>
            <option value="">Activities</option>
            {activities?.map((e, i) => {
              return (
                <option key={i} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>

          <input type="button" value={"Reset"} onClick={handleReset} />
        </div>

        <main className="countries-card-container">
          <CountryCard countries={currentCountries()} />
        </main>

        <Pagination
          countriesPerPage={countriesPerPage}
          totalCountries={countries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
