import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes, Route } from "react-router-dom";

import Movie from '../components/Movie';
import HomePage from '../components/HomePage';





const RouterApp = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact index path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<Movie />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterApp;
