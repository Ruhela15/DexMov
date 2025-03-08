import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./pages/Movie";
import Moviedetails from "./pages/Moviedetails";
import Webseries from "./pages/Webseries";
import TvDetails from "./pages/Tvdetails";
import Trailer from "./components/partial/Trailer";
import Persondetails from "./pages/Persondetails";
import People from "./components/People";


const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />}/>
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer/>} />
        </Route>
        <Route path="/webseries" element={<Webseries />}/>
        <Route path="/tv/details/:id" element={<TvDetails />} >
        <Route path="/tv/details/:id/trailer" element={<Trailer/>} />

        </Route>
        <Route path="/people" element={<People/>}/>
        <Route path="/people/details/:id" element={<Persondetails />} />
      </Routes>
    </div>
  );
};

export default App;
