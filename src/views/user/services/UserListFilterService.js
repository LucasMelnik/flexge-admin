import { action, extendObservable } from 'mobx';
import FormService from '../../../core/services/FormService';

class UserListFilterService {
  form = new FormService();

  constructor() {
    extendObservable(this, {
      pagination: {
        pageSize: 25,
        current: 1,
      },
    });
    this.form.setInitialValues({});
  }

  init = action((onSearch) => {
    this.onSearch = () => {
      this.pagination.current = 1;
      onSearch();
    };
    this.form.setInitialValues({});
  });

  onPaginationChange = action(({ current }) => {
    this.pagination.current = current;
  });
}

const userListFilterService = new UserListFilterService();

export default userListFilterService;
