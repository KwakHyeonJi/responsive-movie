import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import apiConfig from '../api/apiConfig'
import tmdbApi from '../api/tmdbApi'

const Title = styled.div`
    padding: 1rem 0 0.5rem 0;
    font-size: 1.4rem;
    font-weight: bold;
`

const CastList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`

const CastItem = styled.li`
    width: 80px;

    img {
        width: 100%;
        border-radius: 15px;
    }

    p:last-child {
        color: #999999;
        font-size: 0.9rem;
    }
`

interface CastInterface {
    id: number
    name: string
    character: string
    profile: string
}

const Cast = ({ id }: { id: number }) => {
    const [cast, setCast] = useState<CastInterface[]>([])

    const profile = (imgPath: string) => cast && apiConfig.w500Image(imgPath)

    useEffect(() => {
        const getCast = async () => {
            try {
                const response = await tmdbApi.getCast(id)
                const cast = response.data.cast.slice(0, 6)
                setCast(
                    cast.map((item: { id: number; name: string; character: string; profile_path: string }) => ({
                        id: item.id,
                        name: item.name,
                        character: item.character,
                        profile: item.profile_path,
                    }))
                )
            } catch (e) {
                console.error(e)
            }
        }

        getCast()
    }, [id])

    return (
        <>
            <Title>Cast</Title>
            <CastList>
                {cast.map((item) => (
                    <CastItem key={item.id}>
                        <img src={profile(item.profile)} alt={item.name}></img>
                        <p>{item.name}</p>
                        <p>{item.character}</p>
                    </CastItem>
                ))}
            </CastList>
        </>
    )
}

export default Cast
