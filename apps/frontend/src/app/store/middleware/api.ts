import axios from 'axios';
import * as actions from '../apiCall';

const api = ({ dispatch }) => (next) => async (action) => {
  console.log(action);
  console.log(next);
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onError, onStart } = action.payload;

  if (onStart) {
    dispatch({ type: onStart });
  }
  next(action);

  try {
    const response = await axios.request({
      baseURL: 'http://localhost:9001/api',
      url,
      method,
      data,
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
