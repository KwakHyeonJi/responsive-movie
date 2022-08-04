import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './store'

interface favorite {
    id: number
}

const initialState: favorite[] = []

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addItem: (state, { payload }) => {
            state.push({ id: payload })
        },
        delItem: (state, { payload }) => {
            state.splice(
                state.findIndex((item) => item.id === payload),
                1
            )
        },
    },
})

export const { addItem, delItem } = favoritesSlice.actions

export const selectFavorite = (state: RootState) => state.favorites

export default favoritesSlice.reducer
