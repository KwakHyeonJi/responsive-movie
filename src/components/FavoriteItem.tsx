import React, { useEffect, useState } from 'react'
import { MdStar } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import apiConfig from '../api/apiConfig'
import tmdbApi, { Movie } from '../api/tmdbApi'

const FavoriteItemLayout = styled.li`
    display: flex;
    height: 180px;
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    @media ${({ theme }) => theme.device.mobile} {
        flex-direction: column;
        height: auto;
    }
`

const Background = styled.img`
    height: 100%;
`

const Poster = styled.img`
    height: 80%;

    @media ${({ theme }) => theme.device.tablet} {
        height: 0;
    }
`

const ContentBox = styled.div`
    overflow: hidden;
    margin: 0 1.5rem;

    p {
        overflow: hidden;
        display: -webkit-box;
        white-space: normal;
        -webkit-box-orient: vertical;
        width: 100%;
    }

    p:nth-child(1) {
        font-size: 1.5rem;
        font-weight: bold;
        -webkit-line-clamp: 1;
    }

    p:nth-child(4) {
        margin-top: 1rem;
        -webkit-line-clamp: 2;
    }

    p:nth-child(3) {
        display: flex;
        align-items: center;
    }

    @media ${({ theme }) => theme.device.mobile} {
        margin: 0;

        p:nth-child(1) {
            margin-top: 0.5rem;
            font-size: 1.2rem;
        }

        p:nth-child(2),
        p:nth-child(4) {
            height: 0;
            margin: 0;
        }
    }
`

const FavoriteItem = ({ id }: { id: number }) => {
    const [movie, setMovie] = useState<Movie>()

    const navigate = useNavigate()
    const image = (imgPath: string) => apiConfig.w500Image(imgPath)

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await tmdbApi.getMovieDetails(id)
                const data = response.data
                setMovie({
                    id: data.id,
                    title: data.title,
                    overview: data.overview,
                    releaseDate: data.release_date,
                    voteAverage: data.vote_average,
                    backdropPath: data.backdrop_path,
                    posterPath: data.poster_path,
                })
            } catch (e) {
                console.error(e)
            }
        }
        getMovieDetails()
    }, [id])

    const handleClick = () => {
        navigate(`/Movie/${id}`)
    }

    return (
        <>
            {movie && (
                <FavoriteItemLayout onClick={handleClick}>
                    <Background src={image(movie.backdropPath)} alt={movie.title}></Background>
                    <ContentBox>
                        <p>{movie.title}</p>
                        <p>Release date: {movie.releaseDate}</p>
                        <p>
                            {movie.voteAverage.toFixed(1)}
                            <MdStar />
                        </p>
                        <p>{movie.overview}</p>
                    </ContentBox>
                    <Poster src={image(movie.posterPath)} alt={movie.title}></Poster>
                </FavoriteItemLayout>
            )}
        </>
    )
}

export default FavoriteItem
