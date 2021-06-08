import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SUCCEED,
  SET_LOGIN,
  UNSET_LOGIN,
  SET_USERS_PANEL,
  UNSET_USERS_PANEL,
  OPEN_POST_DIALOG,
  CLOSE_POST_DIALOG,
  SET_FOCUS,
} from '../types';

const initialState = {
  loading: false,
  errors: {},
  success: false,
  successMessage: '',
  login: false, //show login component
  openUsersPanel: false,
  UsersPanelType: '',
  openPostDialog: false,
  focus: {},
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
        success: false,
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
    case SET_USERS_PANEL: {
      return {
        ...state,
        loading: false,
        openUsersPanel: true,
        UsersPanelType: action.payload,
      };
    }
    case UNSET_USERS_PANEL: {
      return {
        ...state,
        openUsersPanel: false,
      };
    }
    case OPEN_POST_DIALOG: {
      return {
        ...state,
        openPostDialog: true,
      };
    }
    case CLOSE_POST_DIALOG: {
      return {
        ...state,
        openPostDialog: false,
        focus: {},
      };
    }
    case SET_FOCUS: {
      return {
        ...state,
        focus: action.payload,
      };
    }
    default:
      return state;
  }
}
