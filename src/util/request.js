import axios from 'axios';
import store from '../redux/store';
import {SET_LOGIN} from '../redux/types';

function request(config) {
  return new Promise((resolve, reject) => {
    return axios(config)
      .then((response) => {
        return resolve(response.data);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response.data === 'login required') {
          store.dispatch({type: SET_LOGIN});
        }
      });
  });
}

export default request;
