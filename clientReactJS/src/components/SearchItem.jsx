import React from 'react';

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Rating } from '@mui/material';
export default function SearchItem(props) {


  const [poster_path, setPoster_path] = useState(null);

  const [backdrop_path, setBackdrop] = useState(null);

  const [movieURL, setMovieURL] = useState(null);



  useEffect(() => {


    if (props.dataset.poster_path == null) setPoster_path("https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png");
    else setPoster_path("https://image.tmdb.org/t/p/original/" + props.dataset.poster_path);

    if (props.dataset.backdrop_path == null) setBackdrop("https://upload.wikimedia.org/wikipedia/commons/a/af/Image_non_disponible.png");
    else setBackdrop("https://image.tmdb.org/t/p/original/" + props.dataset.backdrop_path);

    setMovieURL("/movie/" + props.dataset.id)


    /*
          {
            "adult": false,
            "backdrop_path": null,
            "genre_ids": [
                99
            ],
            "id": 591955,
            "original_language": "en",
            "original_title": "The Matrix Reloaded Revisited",
            "overview": "The making of The Matrix Reloaded:  Go to the middle movie's furthest reaches via five documentary paths revealing 21 featurettes.",
            "popularity": 2.903,
            "poster_path": "/gb7C4oRzYWXWCuZMR1cwtHa53Pz.jpg",
            "release_date": "2004-12-07",
            "title": "The Matrix Reloaded Revisited",
            "video": true,
            "vote_average": 6.6,
            "vote_count": 26
        }
    
    */



  }, []);



  return (
    <div className="row mb-5">
      <div className="col-md-2">
        <Link to={movieURL}>  <img src={poster_path} className="img-thumbnail" alt="Affiche " /></Link>
        <a href={movieURL}>
        </a>
      </div>
      <div className="col-md-6 ">
        <h4 className=""><a href={movieURL} className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover">{props.dataset.title}</a></h4>
        <p><Rating name="read-only" value={props.dataset.vote_average/2} readOnly /></p>
        <p className="info">{props.dataset.release_date}</p>
        <p className="description">{props.dataset.overview}</p>
      </div>
    </div>
  );
}


