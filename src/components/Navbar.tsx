import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import styled from 'styled-components'

const NavbarLayout = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    padding: 1rem;
    z-index: 10;

    h1 {
        color: ${({ theme }) => theme.color.primary};
        font-size: 2rem;
        font-weight: bold;
    }

    a {
        margin: 0 1rem;
        padding: 0.3rem 0;
    }

    a:hover {
        border-bottom: 2px solid ${({ theme }) => theme.color.primary};
    }
`

const Navbar = () => {
    return (
        <NavbarLayout>
            <h1>MOVIE</h1>
            <div>
                <Link to='/'>Home</Link>
                <Link to='/Favorites'>Favorites</Link>
            </div>
        </NavbarLayout>
    )
}

export default Navbar
