import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryDetails } from "../components/CountryDetails";
import { CreateActivity } from "../components/CreateActivity";
import { Home } from "../components/Home";
import { LandingPage } from "../components/LandingPage";

export const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/countries/home" exact element={<Home />}></Route>

          <Route
            path="/countries/create-activity"
            exact
            element={<CreateActivity />}
          ></Route>

          <Route
            path="/countries/details/:id"
            element={<CountryDetails />}
          ></Route>

          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
