import { action } from 'mobx';
import FormService from '../../../core/services/FormService';

class UserListFilterService {
  form = new FormService();

  constructor() {
    this.form.setInitialValues({});
  }

  init = action((onSearch) => {
    this.onSearch = onSearch;
    this.form.setInitialValues({});
  });
}

const userListFilterService = new UserListFilterService();

export default userListFilterService;
