import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styled from 'styled-components'

const LikeButtonLayout = styled.button<{ like: boolean }>`
    position: absolute;
    color: ${({ like, theme }) => like && theme.color.primary};
`

interface LikeButtonProps {
    onClick: () => void
    like: boolean
    size?: number
}

const LikeButton = ({ onClick, like, size = 20 }: LikeButtonProps) => {
    return (
        <LikeButtonLayout onClick={onClick} like={like}>
            {like ? <FaHeart size={size} /> : <FaRegHeart size={size} />}
        </LikeButtonLayout>
    )
}

export default LikeButton
