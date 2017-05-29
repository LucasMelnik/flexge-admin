import { action } from 'mobx';
import { browserHistory } from 'react-router';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class LoginService {
  fetch = new FetchService()
  form = new FormService()

  constructor() {
    this.form.validations = {
      email: [
        isRequired,
        isValidEmail,
      ],
      password: [isRequired],
    };
  }

  handleLogin = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      return;
    }
    this.fetch.fetch({
      method: 'post',
      url: '/auth',
      headers: {
        Authorization: `Basic ${btoa(`${this.form.getValue('email')}:${this.form.getValue('password')}`)}`,
      },
    }).then(() => {
      if (this.fetch.data) {
        localStorage.setItem('accessToken', this.fetch.data.key);
        browserHistory.push('/');
      }
      if (this.fetch.error) {
        NotificationService.addNotification('Unable to login. Please check your credentials.', null, null, 'danger');
      }
    });
  })
}

export default LoginService;
