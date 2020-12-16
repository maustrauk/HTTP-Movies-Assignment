import React, {  useEffect, useState } from 'react';
import axios from 'axios';


const initMovie = {
    id: Date.now(),
    title: "",
    stars: [],
    director: "",
    metascore: 0
} 

const UpdateMovieForm = props => {

    const movieId = props.match.params.id;

    const [movie, setMovie] = useState(initMovie);

    useEffect (() => {
        const movieList = JSON.parse(localStorage.getItem("movieList"));
        const movieForUpdate = movieList.filter(movie => movie.id === parseInt(movieId));
        setMovie(movieForUpdate[0]);
    },[movieId]);

    const changeHandler = (event) => {
        const { name , value } = event.target;
        if (name === "stars") {
            const starValue = value.split(",");
            setMovie({...movie, [name]: starValue });
        } else {
            setMovie({...movie, [name]: value });
        }
    };

    const submitHandler = () => {
        axios
        .put(`http://localhost:5000/api/movies/${movieId}`, movie)
        .then(res => {
            setMovie(initMovie);
            props.history.push(`/`);
            props.setReloadApp(!props.reloadApp);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(<div>
        <form >
            <div className="form-group">
                <label htmlFor="titleInput">Edit Title:</label>
                <input name="title"
                id="titleInput"
                className="form-control"
                type="text"
                onChange={changeHandler}
                value={movie.title}
                aria-describedby="titleError" />
                <small id="titleError" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
                <label htmlFor="directorInput">Edit Director:</label>
                <input name="director"
                id="directorInput"
                className="form-control"
                type="text"
                onChange={changeHandler}
                value={movie.director}
                aria-describedby="directorError" />
                <small id="directorError" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
                <label htmlFor="metascoreInput">Edit Metascore:</label>
                <input name="metascore"
                id="metascoreInput"
                className="form-control"
                type="number"
                onChange={changeHandler}
                value={movie.metascore}
                aria-describedby="metascoreError" />
                <small id="metascoreError" className="form-text text-muted"></small>
            </div>

            <div className="form-group">
                <label htmlFor="starsInput">Edit Stars Section:</label>
                <input name="stars"
                id="starsInput"
                className="form-control"
                type="text"
                onChange={changeHandler}
                value={movie.stars.toString()}
                aria-describedby="starsError" />
                <small id="starsError" className="form-text text-muted"></small>
            </div>

            <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
        </form>
    </div>)
}

export default UpdateMovieForm;