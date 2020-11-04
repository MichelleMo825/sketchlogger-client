import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SUCCEED,
  SET_LOGIN,
  UNSET_LOGIN,
} from '../types';

const initialState = {
  loading: false,
  errors: {},
  success: false,
  successMessage: '',
  login: false, //show login component
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
    case SET_LOGIN: {
      return {
        ...state,
        login: true,
      };
    }
    case UNSET_LOGIN: {
      return {
        ...state,
        login: false,
      };
    }
    default:
      return state;
  }
}
