import React, { useEffect, useRef, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import styled from 'styled-components'

import tmdbApi, { rowMovie } from '../api/tmdbApi'
import MovieItem from './MovieItem'

const RowLayout = styled.div`
    padding: 0 1rem;

    h2 {
        padding: 1rem 0;
        font-weight: bold;
    }
`

const MovieBox = styled.div`
    position: relative;

    &:hover {
        & > svg {
            opacity: 0.5;
        }
    }

    & > svg {
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: #fff;
        color: ${({ theme }) => theme.color.body};
        cursor: pointer;
    }

    & > svg:first-child {
        left: 0;
    }

    & > svg:last-child {
        right: 0;
    }

    & > svg:hover {
        opacity: 1;
    }
`

const MovieSlider = styled.ul`
    overflow: hidden;
    display: flex;
    gap: 0.5em;
    position: relative;
    width: 100%;
    line-height: 0;
    scroll-behavior: smooth;
`

interface RowProps {
    title: string
    movieType: string
}

const Row = ({ title, movieType }: RowProps) => {
    const [movies, setMovies] = useState<rowMovie[]>([])
    const [isScrolling, setIsScrolling] = useState<boolean>(false)

    const slider = useRef<HTMLUListElement>(null)

    const slideTimer = () => {
        setIsScrolling(true)
        setTimeout(() => setIsScrolling(false), 400)
    }

    const slideLeft = () => {
        if (slider.current && !isScrolling) {
            slider.current.scrollLeft -= 500
            slideTimer()
        }
    }

    const slideRight = () => {
        if (slider.current && !isScrolling) {
            slider.current.scrollLeft += 500
            slideTimer()
        }
    }

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(movieType, params)
                setMovies(
                    response.data.results.map((movie: { id: number; title: string; backdrop_path: string }) => ({
                        id: movie.id,
                        title: movie.title,
                        backdropPath: movie.backdrop_path,
                    }))
                )
            } catch (e) {
                console.error(e)
            }
        }
        getMovies()
    }, [movieType])

    return (
        <RowLayout>
            <h2>{title}</h2>
            <MovieBox>
                <MovieSlider ref={slider}>
                    {movies.map((movie) => (
                        <MovieItem key={movie.id} movie={movie} />
                    ))}
                </MovieSlider>
                <MdChevronLeft size={40} onClick={slideLeft} />
                <MdChevronRight size={40} onClick={slideRight} />
            </MovieBox>
        </RowLayout>
    )
}

export default Row
