import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, CircularProgress,Rating } from '@mui/material';
export default function Movie(props) {

    const { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`http://localhost:8080/api/movie/${id}`).then(response => {
            response.json().then(json => setData(json));
        }).catch(error => console.error(error));
    }, []);


    useEffect(() => {
        console.log(data)
    }, [data])


    return (
        <Box>
            {data ? (
                <div className='container'>
                    <div class="section-heading">
                        <h2  className='display-3'>{data.title}</h2>
                    </div>

                    <div className='row'>
                        <h4 className='text-center'> 
                            <span >Popularity </span>  <Rating name="read-only" value={data.popularity/20} readOnly /></h4>
                        <img className='img-thumbnail col-md-4' loading="lazy"
                            src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} />
                        <p className='col-md-4 p-4'>
                            {data.overview}
                        </p>
                    </div>

                    {/* 
                    
                        Display casting

                    */}
                    <div className='container'>
                        <div class="row justify-content-around">
                            <h3 className='mt-5'>Cast</h3>
                        {

                            data.cast.map(elt => {

                                return (
                                    <div class="col-md-2">
                                        <div class="casting">
                                            <div class="thumb-container">
                                                <img src={`https://image.tmdb.org/t/p/original/${elt.profile_path}`} alt="" />
                                            </div>
                                            <div class="info">
                                                <h4>{elt.name}</h4>
                                                <span className='role'> {elt.character}</span>                                               
                                            </div>
                                        </div>
                                    </div>
                                   

                                )

                            })
                        }

                    </div>
                    </div>
                </div>
            ) :

                <Box sx={{ display: 'flex', height: "100vh", justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress color="secondary" /> </Box>

            }

        </Box>
    );
}