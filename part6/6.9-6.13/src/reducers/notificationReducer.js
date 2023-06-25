import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            const content = `${action.payload}/${new Date().getTime()}`
            return content
        },
        notificationDelete(state, action) {
            return ''
            }
      },   
})


export const { notificationChange, notificationDelete } = notificationSlice.actions
export default notificationSlice.reducer