const initialState = {
  allCountries: [],
  auxAllCountries: [],
  activities: [],
  countryById: [],
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        allCountries: action.payload,
        auxAllCountries: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        allCountries: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        countryById: action.payload,
      };

    case "RESET_COUNTRY_BY_ID":
      return {
        ...state,
        countryById: action.payload,
      };

    case "CREATE_ACTIVITY":
      return {
        ...state,
        countryById: action.payload,
      };

    case "FILTER_CONTINENTS":
      if (action.payload === "")
        return {
          ...state,
          allCountries: state.auxAllCountries,
        };
      let filteredCountries = state.auxAllCountries.filter(
        (e) => e.continent === action.payload
      );
      return {
        ...state,
        allCountries: filteredCountries,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "FILTER_ACTIVITIES":
      let countriesByActivity = state.auxAllCountries.filter((e) =>
        e.activities.some((e) => e.name === action.payload)
      );
      return {
        ...state,
        allCountries: countriesByActivity,
      };

    case "ORDER":
      let countries = state.allCountries;

      if (action.payload === "A-Z") {
        countries = countries.sort((a, b) => {
          if (a.name < b.name) return -1;

          if (a.name > b.name) return 1;
          else {
            if (a.population < b.population) return -1;

            if (a.population > b.population) return 1;

            return 0;
          }
        });
      } else if (action.payload === "Z-A") {
        countries = countries.sort((a, b) => {
          if (a.name > b.name) return -1;

          if (a.name < b.name) return 1;
          else {
            if (a.population > b.population) return -1;

            if (a.population < b.population) return 1;

            return 0;
          }
        });
      }

      return {
        ...state,
        allCountries: countries,
      };

    default:
      return state;
  }
};
