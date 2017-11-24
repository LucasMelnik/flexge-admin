import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

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
      url: '/grammar-placement-test-levels',
      query: {
        query: {
          ...this.form.getValue('grammar') && { grammar: this.form.getValue('grammar') },
          ...this.form.getValue('placementTestLevel') && { placementTestLevel: this.form.getValue('placementTestLevel') },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.placementTests = orderBy(this.fetch.data, ['placementTestLevel.level', 'order'], ['asc',  'asc']);
      } else {
        this.placementTests = [];
      }
    });
  });

  handleRemove = action((grammarPlacementTest) => {
    ConfirmationDialogService.show(
      'Delete Grammar from Placement Tests',
      `You are about to delete the grammar "${grammarPlacementTest.grammar.name} - level ${grammarPlacementTest.placementTestLevel.level}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/grammar-placement-test-levels/${grammarPlacementTest.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification('Grammar deleted', 'success');
          this.load();
        });
      });
  });
}

const placementTestListService = new PlacementTestListService();

export default placementTestListService;
