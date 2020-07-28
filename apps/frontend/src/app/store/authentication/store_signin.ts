import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect'
import { apiCallBegan } from '../apiCall';

const slice = createSlice({
  name: 'signIn',
  initialState: {
    loading: false,
    error: false,
    errorMessage: ''
  },
  reducers: {
    SIGN_IN_REQUESTED: (state, action) => {
      state.loading = true;
      state.error = false
    },
    SIGNED_IN: (state, action) => {
      state.loading = false;
      state.error = false
    },
    SIGN_IN_FAILED: (state, action) => {
      state.loading = false;
      state.error = true
      state.errorMessage = action.payload
    },
  },
});

const { SIGN_IN_REQUESTED, SIGNED_IN, SIGN_IN_FAILED } = slice.actions;
export default slice.reducer;

const url = '/auth/login';

export const signIN = (signInCredentials) => {
  return apiCallBegan({
    url,
    onStart: SIGN_IN_REQUESTED.type,
    method: 'POST',
    data: signInCredentials,
    onSuccess: SIGNED_IN.type,
    onError: SIGN_IN_FAILED.type,
  });
};


export const checkLoginStatus = createSelector(
  (state: any) => state.signIn,
  (login: any) => login
)