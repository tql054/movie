import React, { useState, useEffect, useCallback} from 'react';

import './movie-grid.scss'

// import MovieCard from '../movie-card/MovieCard';
import { useNavigate, useParams } from 'react-router';
import { category, movieType } from '../../api/tuanmovieApi';
import tuanApi from '../../api/tuanmovieApi';
import { OutlineButton } from '../button/button';
// import Input from '../input/Input';
import { Input, MovieCard } from "../../components";


const MovieGrid = (props) => {

    const  [items, setItems] = useState()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    const { keyword } = useParams()

    useEffect(() => {
        const getList = async () => {
            let response = null
            if(keyword === undefined) {
                const params = {}
                switch(props.category) {
                    case category.movie:
                        response = await tuanApi.getMoviesList(movieType.upcoming, {params})
                        break;
                    default:
                        response = await tuanApi.getMoviesList(movieType.popular, {params})
                }       
            } else {
                const params = {
                    query: keyword
                }
                response = await tuanApi.search(props.category, {params})
            }
            setItems(response.data.results)
            setTotalPage(response.data.total_pages)
        }
        getList()
    }, [props.category, keyword, items])

    const loadMore = async () => {
        let response = null
        if(keyword === undefined) {
            const params = {
                page: page + 1
            }
            switch(props.category) {
                case category.movie:
                    response = await tuanApi.getMoviesList(movieType.upcoming, {params})
                    break;
                default:
                    response = await tuanApi.getMoviesList(movieType.popular, {params})
            }       
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tuanApi.search(props.category, {params})
        }
        setItems([...items, ...response.data.results])
        setPage(page + 1)
    }
    return (
        items ? (
        <>
            <div className="section mb-3">
                <MovieSearch category={props.category} keyword={keyword}/>
            </div>
            <div className='movie-grid'>
                {
                    items.map((item, i) => <MovieCard category={props.category} item={item} key={i}/>)
                }
            </div>
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            }
        </>
        ) : (
            <>
                <div className="section mb-3">
                    <MovieSearch category={props.category} keyword={keyword}/>
                </div>
                <h1>Loading</h1>
            </>
        )
    )
}

const MovieSearch = props => {

    const navigate = useNavigate()
    const [keyword, setKeyword]= useState(props.keyword ? props.keyword : '')
    const goToSearch = useCallback(
        () => {
            
        console.log('refresh')
            if(keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`)
            }
        }, 
        [keyword, props.category, navigate]
        
    )

        useEffect(() => {
            const enterEvent = (e) => {
                e.preventDefault()
                if(e.keyCode === 13) goToSearch()
            }

            document.addEventListener('keyup', enterEvent)
            return () => {
                document.removeEventListener('keyup', enterEvent)
            }
        }, [keyword, goToSearch])
    return (

        <div className="movie-search">
            <Input 
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e)=> setKeyword(e.target.value)}
            />
        </div>
    )
}

export default MovieGrid