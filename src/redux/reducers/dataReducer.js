import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  SET_USERDATA,
  SET_TAGS,
  UPDATE_POST,
  SET_WORKS,
  SET_LIKES,
} from '../types';

const initialState = {
  user: {},
  posts: [],
  likes: [],
  works: [],
  loading: false,
  tags: [],
  finishdLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        finishedLoading: true,
      };
    case SET_WORKS:
      return {
        ...state,
        loading: false,
        works: action.payload,
        finishedLoading: true,
      };

    case SET_LIKES:
      return {
        ...state,
        loading: false,
        likes: action.payload,
        finishedLoading: true,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
        finishedLoading: false,
      };

    case LIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[index] = action.payload;

      if (action.payload.user_id === state.user.id) {
        console.log(state.likes);
        index = state.likes.findIndex((post) => post.id === action.payload.id);
        state.likes[index] = action.payload;
      }

      return {
        ...state,
      };
    case UNLIKE_POST:
      let likeIndex = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      state.posts[likeIndex] = action.payload;

      likeIndex = state.likes.findIndex(
        (post) => post.id === action.payload.id
      );

      state.likes[likeIndex] = action.payload;

      return {
        ...state,
      };

    case SET_USERDATA:
      return {
        ...state,
        user: {...action.payload},
      };

    case SET_TAGS:
      return {
        ...state,
        tags: getTags(state.posts),
      };

    case UPDATE_POST:
      const i = state.posts.findIndex((post) => post.id === action.payload.id);
      state.posts[i] = action.payload;
      state.tags = getTags(state.posts);
      return {
        ...state,
      };

    default:
      return state;
  }
}

const getTags = (posts) => {
  let tags = new Set();
  let tagIds = new Set();

  posts.map((post) => {
    post.tags.map((tag) => {
      if (!tagIds.has(tag.id)) {
        tags.add(tag);
        tagIds.add(tag.id);
      }
    });
  });

  return [...tags];
};
