import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_SUCCEED,
} from '../types';
import axios from 'axios';

export const loginUser = (data, history) => (dispatch) => {
  dispatch({type: LOADING_UI});

  axios
    .post('login', data)
    .then((res) => {
      console.log(res.data);
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(getUserData());
      dispatch({type: CLEAR_ERRORS});
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = (history) => (dispatch) => {
  dispatch({type: LOADING_UI});

  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({type: SET_UNAUTHENTICATED});
};

export const updateProfile = (data) => (dispatch) => {
  axios
    .post('/user/updateProfile', data)
    .then((res) => {
      dispatch({type: SET_SUCCEED, payload: 'Profile updated successfully'});
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const uploadAvatar = (data) => (dispatch) => {
  axios
    .post('/user/avatar', data)
    .then(() => {
      dispatch({type: SET_SUCCEED, payload: 'Avatar updated successfully'});
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const changePassword = (data) => (dispatch) => {
  axios
    .post('updatePassword', data)
    .then(() => {
      dispatch({type: SET_SUCCEED, payload: 'Password updated successfully'});
      dispatch(logoutUser());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
export const getUserData = () => (dispatch) => {
  axios
    .get('/currentUser')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
