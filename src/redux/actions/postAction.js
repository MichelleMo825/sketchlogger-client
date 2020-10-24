import {
  SET_CLOSE,
  LOADING_UI,
  SET_SUCCEED,
  EDIT_POST,
  UPDATE_POST,
} from '../types';
import axios from 'axios';

export const close = () => (dispatch) => {
  dispatch({type: SET_CLOSE});
};

export const newPost = (data) => (dispatch) => {
  dispatch({type: LOADING_UI});

  axios.post('/images', data.files).then((res) => {
    const postData = {
      description: data.description,
      images: res.data.ids.join(','),
      tags: data.tags.join(','),
    };

    axios
      .post('/post', postData)
      .then(() => {
        dispatch({
          type: SET_SUCCEED,
          payload: 'New post uploaded successfully',
        });
        dispatch(close());
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export const editPost = (data) => (dispatch) => {
  // console.log(data);
  dispatch({type: EDIT_POST, payload: data});
};

export const updatePost = (data) => (dispatch) => {
  dispatch({type: LOADING_UI});

  axios
    .post('/images', data.files)
    .then((res) => {
      const postData = {
        description: data.description,
        images: data.images.concat(res.data.ids).join(','),
        tags: data.tags.join(','),
      };

      axios
        .put(`/post?id=${data.id}`, postData)
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: UPDATE_POST,
            payload: res.data,
          });

          dispatch(close());
          dispatch({
            type: SET_SUCCEED,
            payload: 'Post updated successfully',
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
