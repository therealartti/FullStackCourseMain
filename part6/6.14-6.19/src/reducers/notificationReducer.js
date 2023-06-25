import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            const content = `${action.payload.text}/${new Date().getTime()}`
            return {"text": content, "timeout": action.payload.timeout}
        },
        notificationDelete(state, action) {
            return ''
            }
      },   
})

export const { notificationChange, notificationDelete } = notificationSlice.actions

export const setNotification = (text, timeout) => {
    console.log()
    return async dispatch => {
      dispatch(notificationChange({"text": text, "timeout": timeout}))
    }
}

export default notificationSlice.reducer