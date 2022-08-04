import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import apiConfig from '../api/apiConfig'
import tmdbApi, { Movie, movieType } from '../api/tmdbApi'
import Trailer from './Trailer'

const MainLayout = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 550px;
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.9) 100%);
`

const Background = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const ContentBox = styled.div`
    position: absolute;
    top: 25%;
    left: 5%;

    p:first-of-type {
        font-size: 0.9rem;
        padding: 0.3rem 0;
    }
`

const Title = styled.h1`
    font-size: 3em;
    font-weight: bold;

    @media ${({ theme }) => theme.device.tablet} {
        font-size: 2em;
    }

    @media ${({ theme }) => theme.device.mobile} {
        font-size: 1.5em;
    }
`

const ButtonBox = styled.div`
    margin: 0.8rem 0;
`

const TrailerButton = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.color.primary};
    border-radius: 30px;
    background: ${({ theme }) => theme.color.primary};
`

const LaterButton = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid #fff;
    border-radius: 30px;
    margin-left: 0.8rem;
`

const OverviewParagraph = styled.p`
    width: 35%;

    @media ${({ theme }) => theme.device.tablet} {
        width: 50%;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 70%;
    }
`
type mainMovie = Pick<Movie, 'id' | 'title' | 'overview' | 'releaseDate' | 'backdropPath'>

const Main = () => {
    const [movies, setMovies] = useState<mainMovie[]>([])
    const [movie, setMovie] = useState<mainMovie>()
    const [open, setOpen] = useState(false)

    const truncateString = (str: string, num: number) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str
        }
    }

    const handleClickLater = () => {
        setMovie(movies[Math.floor(Math.random() * movies.length)])
    }

    const background = movie && apiConfig.originalImage(movie.backdropPath)
    const overview = movie && truncateString(movie.overview, 150)

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType.popular, params)
                setMovies(
                    response.data.results.map((movie: { id: number; title: string; backdrop_path: string; overview: string; release_date: string }) => ({
                        id: movie.id,
                        title: movie.title,
                        releaseDate: movie.release_date,
                        overview: movie.overview,
                        backdropPath: movie.backdrop_path,
                    }))
                )
            } catch (e) {
                console.error(e)
            }
        }
        getMovies()
    }, [])

    useEffect(() => {
        const updateMovie = () => setMovie(movies[Math.floor(Math.random() * movies.length)])

        updateMovie()
        const intervalId = setInterval(updateMovie, 10000)

        return () => clearInterval(intervalId)
    }, [movies])

    return (
        <>
            <MainLayout>
                <Background src={background} alt={movie?.title}></Background>
                <Overlay />
                <ContentBox>
                    <Title>{movie?.title}</Title>
                    <ButtonBox>
                        <TrailerButton onClick={() => setOpen(true)}>Trailer</TrailerButton>
                        <LaterButton onClick={handleClickLater}>Watch Later</LaterButton>
                    </ButtonBox>
                    <p>Release date: {movie?.releaseDate}</p>
                    <OverviewParagraph>{overview}</OverviewParagraph>
                </ContentBox>
            </MainLayout>
            {movie && open && <Trailer id={movie.id} onClose={() => setOpen(false)} />}
        </>
    )
}

export default Main
