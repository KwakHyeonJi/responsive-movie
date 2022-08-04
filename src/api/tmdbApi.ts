import axiosClient from './axiosClient'

export interface Movie {
    id: number
    title: string
    overview: string
    releaseDate: string
    voteAverage: number
    backdropPath: string
    posterPath: string
}

export type rowMovie = Pick<Movie, 'id' | 'title' | 'backdropPath'>

export interface MovieType {
    [key: string]: string
}

export const movieType: MovieType = {
    popular: 'popular',
    topRated: 'top_rated',
    upcoming: 'upcoming',
}

const tmdbApi = {
    getMovieDetails: (movieId: number) => {
        const url = 'movie/' + movieId
        return axiosClient.get(url, { params: {} })
    },
    getMovieList: (type: string, params: object) => {
        const url = 'movie/' + type
        return axiosClient.get(url, { params })
    },
    getVideoList: (movieId: number) => {
        const url = 'movie/' + movieId + '/videos'
        return axiosClient.get(url, { params: {} })
    },
    getCast: (movieId: number) => {
        const url = 'movie/' + movieId + '/credits'
        return axiosClient.get(url, { params: {} })
    },
}

export default tmdbApi
