import React, { useState } from 'react';
import axios from 'axios';

const initMovie = {
    id: Date.now(),
    title: "",
    stars: [],
    director: "",
    metascore: 0
} 

const AddMovieForm = props => {


    const [movie, setMovie] = useState(initMovie);

    const changeHandler = (event) => {
        const { name , value } = event.target;
        setMovie({...movie, [name]: value });
    };

    const submitHandler = () => {
        axios
        .post(`http://localhost:5000/api/movies`, movie)
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
                <label htmlFor="titleInput">Enter Title:</label>
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
                <label htmlFor="directorInput">Enter Director:</label>
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
                <label htmlFor="metascoreInput">Enter Metascore:</label>
                <input name="metascore"
                id="metascoreInput"
                className="form-control"
                type="number"
                onChange={changeHandler}
                value={movie.metascore}
                aria-describedby="metascoreError" />
                <small id="metascoreError" className="form-text text-muted"></small>
            </div>

            <button type="button" className="btn btn-primary" onClick={submitHandler}>Submit</button>
        </form>
    </div>)
}

export default AddMovieForm;