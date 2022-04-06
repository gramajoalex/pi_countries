import axios from "axios";

export const getCountries = () => {
  return async (dispatch) => {
    const countries = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: countries.data,
    });
  };
};

export const getCountryByName = (name) => {
  return async (dispatch) => {
    const country = await axios.get(
      `http://localhost:3001/countries?name=${name}`
    );
    return dispatch({
      type: "GET_BY_NAME",
      payload: country.data,
    });
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    const country = await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({
      type: "GET_BY_ID",
      payload: country.data,
    });
  };
};

export const resetCountryById = () => {
  return async (dispatch) => {
    return dispatch({
      type: "RESET_COUNTRY_BY_ID",
      payload: [],
    });
  };
};

export const createActivity = (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  return async (dispatch) => {
    const country = await axios.post(`http://localhost:3001/activity/`, {
      name,
      difficulty,
      duration,
      season,
      countries,
    });
    return dispatch({
      type: "CREATE_ACTIVITY",
      payload: country.data,
    });
  };
};

export const order = (payload) => {
  return {
    type: "ORDER",
    payload,
  };
};

export const filterByContinent = (payload) => {
  return {
    type: "FILTER_CONTINENTS",
    payload,
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    const activities = await axios.get(`http://localhost:3001/activities`);
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: activities.data,
    });
  };
};

export const filterByActivity = (payload) => {
  return {
    type: "FILTER_ACTIVITIES",
    payload,
  };
};
