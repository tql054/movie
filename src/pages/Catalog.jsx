import React from "react";

import { useParams } from "react-router";

import { MovieGrid, PageHeader } from "../components";

import { category as cate } from "../api/tuanmovieApi";

const Catalog = () => {
    
    const { category } = useParams()


    return (
        <div>
            <PageHeader>
                {category === cate.movie ? "Movies" : "TV Series"}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </div>
    )
}

export default Catalog