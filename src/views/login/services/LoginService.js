import { action } from 'mobx';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired, isValidEmail } from '../../../core/validations';
import WhitelabelService from '../../../core/services/WhitelabelService';

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
      body: {
        distributor: WhitelabelService.config.distributor
      },
    }).then(() => {
      if (this.fetch.data) {
        localStorage.setItem('email', this.fetch.data.email);
        localStorage.setItem('accessToken', this.fetch.data.accessToken);
        const decodedToken = jwtDecode(this.fetch.data.accessToken);
        localStorage.setItem('id', decodedToken.sub);
        localStorage.setItem('role', decodedToken.role);
        if (decodedToken.distributor && typeof decodedToken.distributor === 'string') {
          localStorage.setItem('distributor', decodedToken.distributor);
        }
        if (decodedToken.company && typeof decodedToken.company === 'string') {
          localStorage.setItem('company', decodedToken.company);
        }
        if (decodedToken.school) {
          localStorage.setItem('school', decodedToken.school);
        } else {
          localStorage.removeItem('school');
        }
        browserHistory.push('/');
        NotificationService.addNotification('Welcome again!', 'info');

        this.fetch.fetch({
          url: '/received-messages/count-unread',
        }).then(() => {
          if (this.fetch.data) {
            NotificationService.addNotification(`You have ${this.fetch.data.total} new message${this.fetch.data.total === 1 ? '' : 's'}`, 'info');
          } else {
            this.total = 0;
          }
        });
      }
      if (this.fetch.error) {
        NotificationService.addNotification('Unable to login. Please check your credentials.', 'error');
      }
    });
  })
}

export default LoginService;
