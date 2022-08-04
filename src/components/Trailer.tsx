import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import YouTube from 'react-youtube'

import tmdbApi from '../api/tmdbApi'

const Block = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 20;
`

const TrailerLayout = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;

    iframe {
        width: 1024px;
        height: 576px;

        @media ${({ theme }) => theme.device.tablet} {
            width: 640px;
            height: 360px;
        }

        @media ${({ theme }) => theme.device.mobile} {
            width: 480px;
            height: 270px;
        }
    }
`

interface TrailerProps {
    id: number
    onClose: () => void
}

const Trailer = ({ id, onClose }: TrailerProps) => {
    const [video, setVideo] = useState<string>()

    useEffect(() => {
        const getVideo = async () => {
            try {
                const response = await tmdbApi.getVideoList(id)
                setVideo(response.data.results[0].key)
            } catch (e) {
                console.error(e)
            }
        }
        getVideo()
    }, [])

    return (
        <>
            <Block onClick={onClose} />
            <TrailerLayout>
                <YouTube
                    videoId={video}
                    opts={{
                        playerVar: {
                            autoplay: 1,
                            modestbranding: 1,
                        },
                    }}
                    onEnd={(e) => {
                        e.target.stopVideo(0)
                    }}
                />
            </TrailerLayout>
        </>
    )
}

export default Trailer
