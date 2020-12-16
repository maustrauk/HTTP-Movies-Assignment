import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './forms/UpdateMovieForm';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [reloadApp, setReloadApp] = useState(false);
  
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data);
        localStorage.setItem("movieList", JSON.stringify(res.data));
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    console.log("App reloaded");
  }, [reloadApp]);


  return (
    <div>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id"
      render={props => <Movie {...props} addToSavedList={addToSavedList} setReloadApp={setReloadApp} reloadApp={reloadApp}/>}
      />


      <Route path="/update-movie/:id"
      render={props => <UpdateMovieForm {...props}  setReloadApp={setReloadApp} reloadApp={reloadApp}/>}
      />
    </div>
  );
};

export default App;
