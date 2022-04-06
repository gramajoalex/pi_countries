const { Router } = require("express");
const { Country, Activity } = require("../db");
const {
  getCountriesFromApi,
  getCountriesFromDB,
  getCountryByName,
  getCountryById,
} = require("../controllers/country");
const { createActivity, getActivities } = require("../controllers/activity");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//1- En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
//2- Obtener un listado de los paises.
//3- Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
//4- Si no existe ningún país mostrar un mensaje adecuado
router.get("/countries", async (req, res) => {
  const { name } = req.query;
  //Si no se reciben queries se envia la informacion para la ruta principal y si los datos no estan en la db, se agregan.
  if (!name) {
    try {
      const countries = await getCountriesFromDB();
      if (countries.length) {
        const filteredData = countries.map((e) => {
          return {
            id: e.id,
            name: e.name,
            image: e.image,
            continent: e.continent,
            activities: e.activities,
          };
        });
        return res.status(200).send(filteredData);
      } else {
        const countries = await getCountriesFromApi();
        countries.forEach(async (e) => {
          await Country.create({
            id: e.id,
            name: e.name,
            image: e.image,
            continent: e.continent,
            capital: e.capital,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          });
        });
        const filteredData = countries.map((e) => {
          return {
            id: e.id,
            name: e.name,
            image: e.image,
            continent: e.continent,
            activities: e.activities,
          };
        });
        return res.status(200).send(filteredData);
      }
    } catch {
      return res.status(404).send("No countries found ");
    }
  } else {
    try {
      const country = await getCountryByName(name);
      return res.status(200).send(country);
    } catch {
      return res.status(404).send("No country found with that name");
    }
  }
});

//1- Obtener el detalle de un país en particular
//2- Debe traer solo los datos pedidos en la ruta de detalle de país
//3- Incluir los datos de las actividades turísticas correspondientes
router.get("/countries/:idPais", async (req, res) => {
  const { idPais } = req.params;
  if (idPais) {
    try {
      const country = await getCountryById(idPais);

      return res.status(200).send(country);
    } catch {
      return res.status(404).send("No country found with that ID");
    }
  }
});

//1- Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
//2- Crea una actividad turística en la base de datos
router.post("/activity", async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;
  // console.log(name, difficulty, duration, season, countries);
  try {
    const activity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    console.log(activity);

    // return res.status(201).send("Successfully created");
    return res.status(201).send(activity);
  } catch (err) {
    return res.send(err);
  }
});

router.get("/activities", async (req, res) => {
  const activities = await getActivities();
  res.status(200).send(activities);
});

module.exports = router;
