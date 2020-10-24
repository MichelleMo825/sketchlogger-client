import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  SET_USERDATA,
  SET_TAGS,
  SET_LIKES,
  SET_WORKS,
} from '../types';
import axios from 'axios';

export const getPosts = () => (dispatch) => {
  dispatch({type: LOADING_DATA});

  axios.get('/posts').then((res) => {
    console.log(res.data.posts);
    dispatch(setPosts(res.data.posts));
  });
};

export const getUserPosts = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  axios.get(`/user/posts?username=${username}`).then((res) => {
    dispatch(setPosts(res.data.posts));

    dispatch({type: SET_TAGS});
  });
};

export const getUserWorks = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  axios.get(`/user/images?username=${username}`).then((res) => {
    dispatch({type: SET_WORKS, payload: res.data.images});
  });
};

export const getUserLikes = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  axios.get(`/user/likes?username=${username}`).then((res) => {
    console.log(res.data);
    dispatch({type: SET_LIKES, payload: res.data.likes});
  });
};
export const getUserInfo = (username) => (dispatch) => {
  axios.get(`/user?username=${username}`).then((res) => {
    dispatch({type: SET_USERDATA, payload: res.data});
  });
};
export const likePost = (id) => (dispatch) => {
  axios
    .post(`/post/like?id=${id}`)
    .then((res) => {
      dispatch({type: LIKE_POST, payload: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikePost = (id) => (dispatch) => {
  axios
    .delete(`/post/like?id=${id}`)
    .then((res) => {
      dispatch({type: UNLIKE_POST, payload: res.data});
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setPosts = (data) => (dispatch) => {
  dispatch({type: SET_POSTS, payload: data});
};
