import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  SET_USERDATA,
  SET_TAGS,
  SET_LIKES,
  SET_WORKS,
  UPDATE_POST,
  SET_SUCCEED,
  DELETE_POST,
  LOAD_POST,
} from '../types';
import request from '../../util/request';
export const getPosts = () => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: '/posts'}).then((data) => {
    dispatch(setPosts(data.posts));
  });
};

export const getUserPosts = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: `/user/posts?username=${username}`}).then(
    (data) => {
      dispatch(setPosts(data.posts));

      dispatch({type: SET_TAGS});
    }
  );
};

export const getFollowingPosts = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: `/followingPosts`}).then((data) => {
    dispatch(setPosts(data.posts));

    dispatch({type: SET_TAGS});
  });
};

export const getUserWorks = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: `/user/images?username=${username}`}).then(
    (data) => {
      dispatch({type: SET_WORKS, payload: data.images});
    }
  );
};

export const getUserLikes = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: `/user/likes?username=${username}`}).then(
    (data) => {
      dispatch({type: SET_LIKES, payload: data.likes});
    }
  );
};
//load to posts instead of likes
export const loadLikes = (username) => (dispatch) => {
  dispatch({type: LOADING_DATA});

  request({method: 'get', url: `/user/likes?username=${username}`}).then(
    (data) => {
      dispatch({type: SET_POSTS, payload: data.likes});
    }
  );
};
export const getUserInfo = (username) => (dispatch) => {
  request({method: 'get', url: `/user?username=${username || 0}`}).then(
    (data) => {
      dispatch({type: SET_USERDATA, payload: data});
    }
  );
};
export const likePost = (id) => (dispatch) => {
  request({method: 'post', url: `/post/like?id=${id}`}).then((data) => {
    dispatch({type: LIKE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
  });
};

export const unlikePost = (id) => (dispatch) => {
  request({method: 'delete', url: `/post/like?id=${id}`}).then((data) => {
    dispatch({type: UNLIKE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
  });
};

export const commentPost = (id, content) => (dispatch) => {
  request({
    method: 'post',
    url: `/post/comment?id=${id}`,
    data: {content: content},
  }).then((data) => {
    dispatch({type: UPDATE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
    dispatch({type: SET_SUCCEED, payload: 'comment posted successfully'});
  });
};

export const deleteComment = (id) => (dispatch) => {
  request({
    method: 'delete',
    url: `/post/comment?id=${id}`,
  }).then((data) => {
    dispatch({type: UPDATE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
    dispatch({type: SET_SUCCEED, payload: 'comment deleted successfully'});
  });
};

export const replyComment = (id, content) => (dispatch) => {
  request({
    method: 'post',
    url: `/post/comment/reply?id=${id}`,
    data: {body: content},
  }).then((data) => {
    dispatch({type: UPDATE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
    dispatch({type: SET_SUCCEED, payload: 'reply posted successfully'});
  });
};
export const deleteReply = (id) => (dispatch) => {
  request({
    method: 'delete',
    url: `/post/comment/reply?id=${id}`,
  }).then((data) => {
    dispatch({type: UPDATE_POST, payload: data});
    dispatch({type: LOAD_POST, payload: data});
    dispatch({type: SET_SUCCEED, payload: 'reply deleted successfully'});
  });
};
export const setPosts = (data) => (dispatch) => {
  dispatch({type: SET_POSTS, payload: data});
};

export const deletePost = (id) => (dispatch) => {
  request({
    method: 'delete',
    url: `/post?id=${id}`,
  }).then((data) => {
    dispatch({type: DELETE_POST, payload: id});
    dispatch({type: SET_SUCCEED, payload: 'post deleted successfully'});
  });
};
