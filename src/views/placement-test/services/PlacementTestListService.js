import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class PlacementTestListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      placementTests: [],
      filter: '',
    });
  }

  init = action(() => {
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/placement-tests',
      query: {
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
          company: this.form.getValue('company').id,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.placementTests = this.fetch.data;
      } else {
        this.placementTests = [];
      }
    });
  });

  handleRemove = action((placementTest) => {
    ConfirmationDialogService.show(
      'Delete Placement Test',
      `You are about to delete the placement test "${placementTest.level} - ${placementTest.grammar.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/placement-tests/${placementTest.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const placementTestListService = new PlacementTestListService();

export default placementTestListService;
