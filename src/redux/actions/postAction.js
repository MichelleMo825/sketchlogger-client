import {
  SET_CLOSE,
  LOADING_UI,
  SET_SUCCEED,
  EDIT_POST,
  UPDATE_POST,
  ADD_POST,
} from '../types';
import axios from 'axios';
import request from '../../util/request';

export const close = () => (dispatch) => {
  dispatch({type: SET_CLOSE});
};

export const newPost = (post) => (dispatch) => {
  dispatch({type: LOADING_UI});

  request({method: 'post', url: '/images', data: post.files}).then((data) => {
    const postData = {
      description: post.description,
      images: data.ids.join(','),
      tags: post.tags.join(','),
    };

    request({method: 'post', url: '/post', data: postData}).then((data) => {
      dispatch({
        type: SET_SUCCEED,
        payload: 'New post uploaded successfully',
      });
      dispatch({type: ADD_POST, payload: data});
      dispatch(close());
    });
  });
};

export const editPost = (data) => (dispatch) => {
  // console.log(data);
  dispatch({type: EDIT_POST, payload: data});
};

export const updatePost = (post) => (dispatch) => {
  dispatch({type: LOADING_UI});

  request({method: 'post', url: '/images', data: post.files}).then((data) => {
    const postData = {
      description: post.description,
      images: post.images.concat(data.ids).join(','),
      tags: post.tags.join(','),
    };

    request({method: 'put', url: `/post?id=${post.id}`, data: postData}).then(
      (data) => {
        dispatch({
          type: UPDATE_POST,
          payload: data,
        });

        dispatch(close());
        dispatch({
          type: SET_SUCCEED,
          payload: 'Post updated successfully',
        });
      }
    );
  });
};
