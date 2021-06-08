import {SET_CLOSE, NEW_POST, EDIT_POST, LOAD_POST} from '../types';

const initialState = {
  open: false,
  new: false,
  files: [],
  description: '',
  tags: [],
  images: [],
  likes: [],
  errors: {},
  comments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLOSE:
      return {
        ...state,
        open: false,
      };

    case NEW_POST:
      return {
        files: [],
        description: '',
        tags: [],
        images: [],
        errors: {},
        likes: [],
        comments: [],
        new: true,
        open: true,
      };
    case EDIT_POST:
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    default:
      return state;
  }
}
