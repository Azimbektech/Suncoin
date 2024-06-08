import axios from 'axios';

export const loadData = () => async dispatch => {
  try {
    const res = await axios.get('/api/data');

    dispatch({
      type: 'DATA_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'DATA_ERROR',
      payload: err.response.data
    });
  }
};
