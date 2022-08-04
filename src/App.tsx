import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Movie from './pages/Movie'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/Favorites' element={<Favorites />} />
                <Route path='/Movie/:id' element={<Movie />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App
