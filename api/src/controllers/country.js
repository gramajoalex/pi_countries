const { Country, Activity } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");

const getCountriesFromApi = async () => {
  try {
    const data = await axios.get("https://restcountries.com/v3/all");
    let countries = data.data.map((e) => {
      let capital = e.capital ? e.capital[0] : "Has no capital";
      return {
        id: e.cca3,
        name: e.translations.spa.common,
        image: e.flags[0],
        continent: e.continents[0],
        capital: capital,
        subregion: e.subregion,
        area: e.area,
        population: e.population,
      };
    });
    return countries;
  } catch {
    return 0;
  }
};

const getCountriesFromDB = async () => {
  try {
    const countries = await Country.findAll({
      order: [["name", "ASC"]],
      include: Activity,
    });
    return countries;
  } catch {
    return 0;
  }
};

const getCountryById = async (id) => {
  if (id) {
    try {
      const countryActivity = await Country.findByPk(id.toUpperCase(), {
        include: Activity,
      });

      return countryActivity;
    } catch {
      return 0;
    }
  }
};

const getCountryByName = async (name) => {
  if (name) {
    try {
      const data = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
      });
      return data;
    } catch {
      return 0;
    }
  }
};

module.exports = {
  getCountriesFromApi,
  getCountriesFromDB,
  getCountryById,
  getCountryByName,
};
