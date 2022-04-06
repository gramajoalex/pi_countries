import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCountries } from "../redux/actions";
import { createActivity } from "../redux/actions";

export const CreateActivity = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);
  const initialFormState = {
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const isValidate = () => {
    for (const element in formData) {
      if (formData[element].length === 0) return false;
    }

    // Expresión regular para validar únicamente letras y números
    if (formData.name.match(/[^A-Za-zÀ-ȕ0-9 ]/)) return false;

    return true;
  };

  const handleInput = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const aux = name === "countries" ? [...formData.countries, value] : value;

    // Esto controla que no se repitan elementos
    if (!formData.countries.includes(value)) {
      setFormData({
        ...formData,
        [name]: aux,
      });
    } else {
      alert("Cannot repeat countries");
    }
  };

  const handleDelete = (element) => {
    setFormData({
      ...formData,
      countries: formData.countries.filter((e) => e !== element),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, difficulty, duration, season, countries } = formData;
    name = name ? name[0].toUpperCase() + name.slice(1) : name;
    if (isValidate()) {
      setFormData(initialFormState);
      dispatch(createActivity(name, difficulty, duration, season, countries));
      alert("Activity created successfully");
      navigate("/countries/home");
    } else {
      alert("Please fill in the fields correctly");
    }
  };

  return (
    <div className="form-container">
      <Link to="/countries/home">
        <button>Back</button>
      </Link>
      <form
        className="form-activity-container"
        method="post"
        autoComplete="off"
      >
        {/* NAME */}
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInput}
            placeholder="Name of the activity"
          />
        </div>

        {/* DIFFICULTY */}
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <br />
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={(e) => handleSelect(e)}
          >
            <option value="" disabled>
              Select difficulty
            </option>
            <option value="1">Very easy</option>
            <option value="2">Easy</option>
            <option value="3">Intermediate</option>
            <option value="4">Difficult</option>
            <option value="5">Very difficult</option>
          </select>
        </div>

        {/* DURATION */}
        <div>
          <label htmlFor="duration">Duration</label>
          <br />
          <select
            name="duration"
            value={formData.duration}
            onChange={(e) => handleSelect(e)}
          >
            <option value="" disabled>
              Select duration
            </option>
            <option value="1">30 minutes or less</option>
            <option value="2">1 hour</option>
            <option value="3">2 hours</option>
            <option value="4">3 hours</option>
            <option value="5">More than 4 hours</option>
          </select>
        </div>

        {/* SEASON */}
        <div>
          <label htmlFor="season">Season</label>
          <br />
          <select
            name="season"
            value={formData.season}
            onChange={(e) => handleSelect(e)}
          >
            <option value="" disabled>
              Select season
            </option>
            <option value="Verano">Summer</option>
            <option value="Otoño">Autumn</option>
            <option value="Primavera">Spring</option>
            <option value="Invierno">Winter</option>
          </select>
        </div>

        {/* COUNTRIES */}
        <div>
          <label htmlFor="countries">Countries</label>
          <br />
          <select name="countries" onChange={(e) => handleSelect(e)}>
            <option value="">Select Countries</option>
            {countries.map((e, i) => {
              return (
                <option key={i} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="selected-countries">
          {formData.countries?.map((e, i) => {
            return (
              <div key={i}>
                <p>{e}</p>
                <span onClick={() => handleDelete(e)}>X</span>
              </div>
            );
          })}
        </div>

        <input
          disabled={false}
          type="submit"
          value="Create activity"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
