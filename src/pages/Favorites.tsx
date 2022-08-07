import React from 'react'
import styled from 'styled-components'

import { useAppSelector } from '../redux/hooks'
import { selectFavorite } from '../redux/favorites'
import FavoriteItem from '../components/FavoriteItem'

const FavoritesLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10rem 0 5rem 0;
`

const FavoriteList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 1000px;

    @media ${({ theme }) => theme.device.tablet} {
        width: 80%;
    }

    @media ${({ theme }) => theme.device.mobile} {
        width: 60%;
    }
`

const Title = styled.h2`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 0 0.5rem;
    font-size: 1.2rem;
`

const Favorites = () => {
    const favorites = useAppSelector(selectFavorite)

    return (
        <FavoritesLayout>
            <FavoriteList>
                <Title>
                    <span>Favorites</span>
                    <span>{`total : ${favorites.length}`}</span>
                </Title>
                {favorites.map((favorite) => (
                    <FavoriteItem key={favorite.id} id={favorite.id} />
                ))}
            </FavoriteList>
        </FavoritesLayout>
    )
}

export default Favorites
