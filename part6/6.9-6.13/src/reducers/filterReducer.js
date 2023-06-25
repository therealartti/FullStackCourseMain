import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterChange(state, action) {
        const content = action.payload
        return content
        }
      }    
})


export const { filterChange } = anecdoteSlice.actions
export default anecdoteSlice.reducer