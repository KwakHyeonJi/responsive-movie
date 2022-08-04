import React from 'react'

import Main from '../components/Main'
import Row from '../components/Row'
import { movieType } from '../api/tmdbApi'

const Home = () => {
    return (
        <>
            <Main />
            <Row title='Up Coming' movieType={movieType.upcoming} />
            <Row title='Popular' movieType={movieType.popular} />
            <Row title='Top Rated' movieType={movieType.topRated} />
        </>
    )
}

export default Home
