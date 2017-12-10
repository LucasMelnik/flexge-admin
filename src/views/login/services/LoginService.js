import { action } from 'mobx';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';

class LoginService {
  fetch = new FetchService();
  form = new FormService();

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
      NotificationService.addNotification('Inform your login and password', 'error');
      return;
    }
    localStorage.clear();
    this.fetch.fetch({
      method: 'post',
      url: '/auth',
      headers: {
        Authorization: `Basic ${btoa(`${this.form.getValue('email')}:${this.form.getValue('password')}`)}`,
      },
    }).then(() => {
      if (this.fetch.data) {
        localStorage.setItem('email', this.fetch.data.email);
        localStorage.setItem('accessToken', this.fetch.data.accessToken);
        const decodedToken = jwtDecode(this.fetch.data.accessToken);
        localStorage.setItem('id', decodedToken.sub);
        localStorage.setItem('role', decodedToken.role);
        localStorage.setItem('company', JSON.stringify(decodedToken.company));
        localStorage.setItem('distributor', decodedToken.distributor);
        if (decodedToken.school) {
          localStorage.setItem('school', JSON.stringify(decodedToken.school));
        } else {
          localStorage.removeItem('school');
        }
        browserHistory.push('/');
        NotificationService.addNotification('Welcome again!', 'info');
      }
      if (this.fetch.error) {
        NotificationService.addNotification('Unable to login. Please check your credentials.', 'error');
      }
    });
  })
}

export default LoginService;
