import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

//reducers
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';
import postReducer from './reducers/postReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
  post: postReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    //   window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  )
);

export default store;
