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
  ADD_POST,
  DELETE_POST,
  SET_FOLLOWUSERS,
  LOAD_POST,
} from '../types';

const initialState = {
  user: {id: undefined},
  post: {
    files: [],
    description: '',
    tags: [],
    images: [],
    likes: [],
    errors: {},
    comments: [],
  }, //open post detail dialog
  posts: [],
  likes: [],
  works: [],
  tags: [],
  followUsers: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case LOAD_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case ADD_POST:
      if (
        state.user.id === action.payload.user_id ||
        state.user.id === undefined
      ) {
        state.posts = [action.payload, ...state.posts];
      }
      return {
        ...state,
      };
    case DELETE_POST:
      const delete_post_index = state.posts.findIndex(
        (post) => post.id === action.payload
      );
      state.posts.splice(delete_post_index, 1);
      return {
        ...state,
      };
    case SET_WORKS:
      return {
        ...state,
        loading: false,
        works: action.payload,
      };

    case SET_LIKES:
      return {
        ...state,
        loading: false,
        likes: action.payload,
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
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
      let j = state.posts.findIndex((post) => post.id === action.payload.id);
      state.posts[j] = action.payload;

      j = state.likes.findIndex((post) => post.id === action.payload.id);

      state.likes[j] = action.payload;

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
      let k = state.posts.findIndex((post) => post.id === action.payload.id);
      state.posts[k] = action.payload;
      state.tags = getTags(state.posts);

      k = state.likes.findIndex((post) => post.id === action.payload.id);

      state.likes[k] = action.payload;

      return {
        ...state,
      };
    case SET_FOLLOWUSERS:
      return {
        ...state,
        followUsers: action.payload,
        loading: false,
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
      return null;
    });
    return null;
  });

  return [...tags];
};
