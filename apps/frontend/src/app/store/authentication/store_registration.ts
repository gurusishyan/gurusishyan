import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiCall';

const slice = createSlice({
    name: 'registration',
    initialState: {
        loading: false,
        student_details: null,
        error: null
    },
    reducers: {
        STUDENT_REGISTRATION_REQUESTED: (state, action): any => (
            state.loading = true
        ),
        STUDENT_REGISTERED: (state, action): any => (
            state.loading = false,
            state.student_details = action.payload,
            state.error = false
        ),
        STUDENT_REGISTRATION_FAILED: (state, action): any => (
            state.loading = false,
            state.error = action.payload
        )
    }
})

const { STUDENT_REGISTRATION_REQUESTED, STUDENT_REGISTERED, STUDENT_REGISTRATION_FAILED } = slice.actions
export default slice.reducer

const url = 'register'

//ACTION_CREATORS
export const registerStudent = (student_details) => (dispatch) => {
    dispatch(apiCallBegan({
        url,
        onStart: STUDENT_REGISTRATION_REQUESTED.type,
        method: 'post',
        data: student_details,
        onSuccess: STUDENT_REGISTERED.type,
        onerror: STUDENT_REGISTRATION_FAILED
    }))
}