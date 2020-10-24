import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_SUCCEED} from '../types';

const initialState = {
  loading: false,
  errors: {},
  success: false,
  successMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: {},
        success: false,
        successMessage: '',
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };

    case SET_SUCCEED:
      return {
        ...state,
        loading: false,
        success: true,
        successMessage: action.payload,
      };

    default:
      return state;
  }
}
