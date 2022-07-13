import React from "react";
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import {Home, Catalog, Detail} from '../pages'
const Routes_pages = () => {
    return (
        <Routes>
            <Route
                exact
                path="/:category/search/:keyword"
                element={<Catalog/>}
            />

            <Route
                exact
                path="/:category/:id"
                element={<Detail/>}
            />

            <Route
                exact
                path="/:category"
                element={<Catalog/>}
            />

            <Route
                path="/"
                exact
                element={<Home/>}
            />
        </Routes>
    )
}

export default Routes_pages