import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userAction';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import settings from './pages/settings';
//components
import Navbar from './components/Navbar';
import Feedback from './components/Feedback';
import PostEditor from './components/PostEditor';
import IconMenu from './components/IconMenu';
//others
import {SET_AUTHENTICATED} from './redux/types';
import {theme} from './util/style';
import {IconButton} from '@material-ui/core';
const token = localStorage.token;

if (token) {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <div className='App'>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route path='/user/:username' component={user} />
                <Route exact path='/' component={home} />
                <Route path='/settings' component={settings} />
                <Route exact path='/login' component={login} />
                <Route exact path='/signup' component={signup} />
              </Switch>
            </div>
          </Router>

          <Feedback />
          <PostEditor />
          <IconMenu />
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
