import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import './hero-slide.scss'

import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import tuanApi, {category, movieType} from '../../api/tuanmovieApi'
import apiConfig from "../../api/apiConfig";
import Button, { OutlineButton } from "../button/button";

const HeroSlide = () => {

    const [movieItems, setMovieItems] = useState([])

    SwiperCore.use([Autoplay])
    useEffect(() => {
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await tuanApi.getMoviesList(movieType.popular, {params})
                setMovieItems(response.data.results.slice(0, 4))
            } catch(e) {
                console.log(e)
            }
        }
        getMovies()
        // console.log('response')

    }, [])
    return (
        <div className="hero-slide">
            {<Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {
                                ({ isActive }) => (
                                    <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                                )
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            }
        </div>
    )
}

const HeroSlideItem = props => {
    const item  = props.item
    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)
    const navigate = useNavigate()
    
    return (
        <div
            className="hero-slide__item"
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HeroSlide