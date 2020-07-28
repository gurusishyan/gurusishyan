import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../apiCall';

const slice = createSlice({
  name: 'signIn',
  initialState: {
    loading: false,
  },
  reducers: {
    SIGN_IN_REQUESTED: (state, action) => {
      state.loading = true;
    },
    SIGNED_IN: (state, action) => {
      state.loading = false;
    },
    SIGN_IN_FAILED: (state, action) => {
      state.loading = true;
    },
  },
});

const { SIGN_IN_REQUESTED, SIGNED_IN, SIGN_IN_FAILED } = slice.actions;
export default slice.reducer;

const url = '/auth';

export const signIN = (signInCredentials) => {
  return apiCallBegan({
    url,
    onStart: SIGN_IN_REQUESTED.type,
    method: 'post',
    data: signInCredentials,
    onSuccess: SIGNED_IN.type,
    onError: SIGN_IN_FAILED.type,
  });
};
