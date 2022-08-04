import React, { useEffect, useState } from 'react'
import { MdStar } from 'react-icons/md'
import { useParams } from 'react-router'
import styled from 'styled-components'

import apiConfig from '../api/apiConfig'
import tmdbApi from '../api/tmdbApi'
import Cast from '../components/Cast'
import LikeButton from '../components/LikeButton'
import { addItem, delItem, selectFavorite } from '../redux/favorites'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

const MovieLayout = styled.div<{ background: string }>`
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url(${({ background }) => background});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
`

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 1) 80%);
`

const ContentBox = styled.div`
    display: flex;
    gap: 1.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1000px;
    padding: 1rem;

    @media ${({ theme }) => theme.device.tablet} {
        flex-direction: column;
        align-items: center;
        top: 100px;
        transform: translate(-50%, 0);
        width: 85%;
    }
`

const Poster = styled.div`
    position: relative;

    img {
        width: 400px;
        border-radius: 20px;
    }

    button {
        top: 20px;
        left: 20px;
    }
`

const TextBox = styled.div`
    h2 {
        font-size: 3rem;
        font-weight: bold;

        @media ${({ theme }) => theme.device.tablet} {
            font-size: 2rem;
        }
    }

    p:nth-of-type(2) {
        padding: 0.2rem 0 1rem 0;
        line-height: 1;

        span {
            margin-right: 1rem;
            padding-left: 1rem;
            border-left: 1px solid;
        }

        span:first-child {
            padding-left: 0;
            border: none;
        }
    }
`

const KeywordList = styled.ul<{ adult: boolean }>`
    display: flex;
    gap: 0.1rem;
    margin: 1rem 0;

    li {
        margin-right: 1rem;
        padding: 0.2rem 1rem;
        border: 2px solid ${({ theme }) => theme.color.text};
        border-radius: 30px;
    }

    li:first-child {
        color: ${({ theme, adult }) => adult && theme.color.primary};
        border-color: ${({ theme, adult }) => adult && theme.color.primary};
    }
`

const RatingSpan = styled.span`
    display: inline-block;
    position: relative;
    padding-right: 1.1rem;

    svg {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
`

interface Genre {
    id: number
    name: string
}

interface MovieDetails {
    title: string
    adult: boolean
    genres: Genre[]
    releaseDate: string
    runtime: number
    voteAverage: number
    overview: string
    backdropPath: string
    posterPath: string
}

const Movie = () => {
    const [movie, setMovie] = useState<MovieDetails>()
    const [like, setLike] = useState(false)
    const { id } = useParams()
    const movieId = parseInt(id ? id : '')

    const favorites = useAppSelector(selectFavorite)
    const dispatch = useAppDispatch()

    const handleClickLike = () => {
        like ? dispatch(delItem(movieId)) : dispatch(addItem(movieId))
    }

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await tmdbApi.getMovieDetails(movieId)
                const data = response.data
                setMovie({
                    title: data.title,
                    adult: data.adult,
                    genres: data.genres,
                    releaseDate: data.release_date,
                    runtime: data.runtime,
                    voteAverage: data.vote_average,
                    overview: data.overview,
                    backdropPath: data.backdrop_path,
                    posterPath: data.poster_path,
                })
            } catch (e) {
                console.error(e)
            }
        }
        getMovieDetails()
    }, [movieId])

    useEffect(() => {
        favorites.findIndex((favorite) => favorite.id === movieId) !== -1 ? setLike(true) : setLike(false)
    }, [favorites, movieId])

    return (
        <>
            {movie && (
                <MovieLayout background={apiConfig.originalImage(movie.backdropPath)}>
                    <Overlay />
                    <ContentBox>
                        <Poster>
                            <img src={apiConfig.originalImage(movie.posterPath)} alt={movie.title}></img>
                            <LikeButton onClick={handleClickLike} like={like} size={25}></LikeButton>
                        </Poster>
                        <TextBox>
                            <h2>{movie.title}</h2>
                            <KeywordList adult={movie.adult}>
                                {movie.adult && <li>Adult</li>}
                                {movie.genres.map((genre) => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </KeywordList>
                            <p>Release date: {movie.releaseDate}</p>
                            <p>
                                <span>{movie.runtime} min</span>
                                <RatingSpan>
                                    {movie.voteAverage.toFixed(1)}
                                    <MdStar />
                                </RatingSpan>
                            </p>
                            <p>{movie.overview}</p>
                            <Cast id={movieId} />
                        </TextBox>
                    </ContentBox>
                </MovieLayout>
            )}
        </>
    )
}

export default Movie
