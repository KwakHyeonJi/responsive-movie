import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import apiConfig from '../api/apiConfig'
import { rowMovie } from '../api/tmdbApi'
import { addItem, delItem, selectFavorite } from '../redux/favorites'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import LikeButton from './LikeButton'

const MovieItemLayout = styled.li`
    flex-shrink: 0;
    position: relative;
    width: 280px;
    cursor: pointer;

    img {
        width: 100%;
    }

    @media ${({ theme }) => theme.device.tablet} {
        width: 220px;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 160px;
    }
`

const Overlay = styled.div`
    opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);

    &:hover {
        opacity: 1;
    }

    button {
        top: 10px;
        left: 10px;
    }

    p {
        overflow: hidden;
        width: 85%;
        font-weight: bold;
        text-overflow: ellipsis;
        text-align: center;
        line-height: 1.5;
        white-space: nowrap;
    }
`

const MovieItem = ({ movie }: { movie: rowMovie }) => {
    const [like, setLike] = useState(false)
    const favorites = useAppSelector(selectFavorite)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const background = apiConfig.w500Image(movie.backdropPath)

    const handleClickMovie = () => {
        navigate(`/Movie/${movie.id}`)
    }

    const handleClickLike = () => {
        like ? dispatch(delItem(movie.id)) : dispatch(addItem(movie.id))
    }

    useEffect(() => {
        favorites.findIndex((favorite) => favorite.id === movie.id) !== -1 ? setLike(true) : setLike(false)
    }, [favorites, movie.id])

    return (
        <MovieItemLayout>
            <img src={background} alt={movie.title}></img>
            <Overlay>
                <p onClick={handleClickMovie}>{movie.title}</p>
                <LikeButton onClick={handleClickLike} like={like} />
            </Overlay>
        </MovieItemLayout>
    )
}

export default MovieItem
