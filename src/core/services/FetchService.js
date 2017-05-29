import { extendObservable, action } from 'mobx';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';

class FetchService {
  constructor() {
    extendObservable(this, {
      fetching: false,
      response: null,
      data: null,
      error: null,
      userId: null,
    });
  }

  fetch = action((params) => {
    if (!this.userId && localStorage.profile) {
      const profile = JSON.parse(localStorage.profile);
      this.userId = profile.user_id;
    }
    this.data = null;
    this.fetching = true;
    return axios.request({
      method: params.method || 'get',
      url: `${process.env.REACT_APP_API_URL}${params.url}`,
      params: params.query,
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
      data: params.body,
      headers: {
        ...params.headers,
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
      ...params.auth && { auth: params.auth },
    }).then(action((response) => {
      this.fetching = false;
      this.response = response;
      this.data = response.data;
      this.error = null;
      return response.data;
    })).catch(action((error) => {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        browserHistory.push('/login');
      }
      this.fetching = false;
      this.response = error.response || error;
      this.error = get(error, 'response.data.message') || 'An error occurred. Please try again later.';
    }));
  })
}

export default FetchService;
