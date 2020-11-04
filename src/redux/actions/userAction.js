import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  SET_SUCCEED,
  SET_FOLLOWUSERS,
} from '../types';
import axios from 'axios';
import request from '../../util/request';
import {getUserInfo} from './dataAction';
export const loginUser = (data, history) => (dispatch) => {
  dispatch({type: LOADING_UI});

  request({method: 'post', url: '/login', data: data}).then((data) => {
    const token = `Bearer ${data.token}`;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
    dispatch(getUserData());
    dispatch({type: CLEAR_ERRORS});
    if (history) {
      if (history.location.pathname === '/login') {
        history.push('/');
      }
    }
  });

  console.log(history);
};

export const logoutUser = () => (dispatch) => {
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

export const getFollowers = (username) => (dispatch) => {
  dispatch({type: LOADING_UI});

  request({method: 'get', url: `/user/follower?username=${username}`}).then(
    (data) => {
      dispatch({type: SET_FOLLOWUSERS, payload: data.users});
    }
  );
};

export const getFollowings = (username) => (dispatch) => {
  dispatch({type: LOADING_UI});

  request({method: 'get', url: `/user/following?username=${username}`}).then(
    (data) => {
      dispatch({type: SET_FOLLOWUSERS, payload: data.users});
    }
  );
};

export const follow = (id, username) => (dispatch) => {
  request({method: 'post', url: `/user/follow?id=${id}`}).then(() => {
    dispatch(getUserData());
  });
};

export const unfollow = (id) => (dispatch) => {
  request({method: 'delete', url: `/user/follow?id=${id}`}).then(() => {
    dispatch(getUserData());
  });
};
