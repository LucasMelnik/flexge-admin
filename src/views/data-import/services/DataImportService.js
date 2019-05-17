import { action, extendObservable, toJS } from 'mobx';
import get from 'lodash/get';
import omit from 'lodash/omit';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class DataImportService {
  submit = new FetchService();
  fetch = new FetchService();
  form = new FormService();

  dataPaths = ['companies', 'schools', 'users', 'schoolClasses', 'students'];

  constructor() {
    extendObservable(this, {
      companies: [],
      schools: [],
      users: [],
      students: [],
      schoolClasses: [],
    });
    this.form.validations = {
      distributor: [isRequired],
    };
  }

  poolResult = action(() => {
    const interval = setInterval(() => {
      this.fetch.fetch({
        url: '/data-import',
        method: 'get',
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(omit(toJS(this.fetch.data), this.dataPaths));
          this.dataPaths.forEach(path => {
            this[path] = get(this.fetch.data, path, []).map(item => {
              if (item.errors && item.errors.length) {
                this.form.setValue('hasErrors', true);
                return {
                  ...item,
                  children: item.errors.map(e => ({ name: e })),
                };
              }
              return item;
            });
          });

          if (['VALIDATE_COMPLETED', 'IMPORT_COMPLETED', 'ERROR'].some(s => s === this.fetch.data.status)) {
            clearInterval(interval);
          }
        }
        if (this.fetch.error) {
          clearInterval(interval);
          NotificationService.addNotification(
            'Error to load data import.',
            'error',
          );
        }
      })
    }, 15000);
  });

  init = action(() => {
    if (localStorage.role === 'DISTRIBUTOR_MANAGER') {
      this.form.setValue('distributor', localStorage.getItem('distributor'));
      this.handleFilter();
    } else {
      this.form.setInitialValues({});
      this.dataPaths.forEach(path => {
        this[path] = [];
      });
    }
  });

  handleFilter = action(() => {
    this.fetch.fetch({
      url: '/data-import',
      method: 'get',
      query: {
        query: {
          ...this.form.getValue('distributor') && {
            distributor: this.form.getValue('distributor')
          }
        }
      }
    }).then(() => {
      if (this.fetch.data) {
        this.form.setInitialValues({
          ...omit(toJS(this.fetch.data), this.dataPaths),
          distributor: this.form.getValue('distributor'),
        });

        this.dataPaths.forEach(path => {
          this[path] = get(this.fetch.data, path, []).map(item => {
            if (item.errors && item.errors.length) {
              this.form.setValue('hasErrors', true);
              return {
                ...item,
                children: item.errors.map(e => ({ name: e })),
              };
            }
            return item;
          });
        });

        if (['PENDING', 'VALIDATING', 'IMPORTING'].some(s => s === this.fetch.data.status)) {
          this.poolResult();
        }
      }
      if (this.fetch.error) {
        NotificationService.addNotification(
          'Error to load data import.',
          'error',
        );
      }
    })
  });

  handleUpload = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const fileData = new FormData();
    fileData.append('spreadsheet', this.form.getValue('file'));
    fileData.append('distributor', this.form.getValue('distributor'));
    fileData.append('id', this.form.getValue('id'));

    this.submit = new FetchService();
    this.submit.fetch({
      url: '/data-import',
      method: 'post',
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues(omit(toJS(this.submit.data), this.dataPaths));
        this.dataPaths.forEach(path => {
          this[path] = [];
        });
        this.poolResult();
        NotificationService.addNotification(
          'File loaded successfully. Await the data validation.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to load the file.',
          'error',
        );
      }
    });
  });

  handleConfirm = action(() => {
    this.submit = new FetchService();
    this.submit.fetch({
      url: `/data-import/${this.form.getValue('id')}`,
      method: 'put',
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({
          ...omit(toJS(this.submit.data), this.dataPaths),
          status: 'IMPORTING',
        });
        this.poolResult();
        NotificationService.addNotification(
          'Saving data.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to save data.',
          'error',
        );
      }
    });
  });

  handleCancel = action(() => {
    this.submit = new FetchService();
    this.submit.fetch({
      url: `/data-import/${this.form.getValue('id')}`,
      method: 'delete',
    }).then(() => {
      if (this.submit.data) {
        this.form.setInitialValues({});
        this.dataPaths.forEach(path => {
          this[path] = [];
        });
        NotificationService.addNotification(
          'Data import Removed.',
          'success',
        );
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to cancel data import.',
          'error',
        );
      }
    });
  });
}

const dataImportService = new DataImportService();

export default dataImportService;