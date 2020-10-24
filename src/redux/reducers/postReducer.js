import {SET_CLOSE, NEW_POST, EDIT_POST} from '../types';

const initialState = {
  open: false,
  new: false,
  files: [],
  description: '',
  tags: [],
  images: [],
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CLOSE:
      return {
        open: false,
        files: [],
        description: '',
        tags: [],
        images: [],
        errors: {},
      };
    case NEW_POST:
      return {
        ...state,
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
