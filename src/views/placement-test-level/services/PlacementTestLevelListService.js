import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class PlacementTestLevelListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      levels: [],
      course: '',
    });
  }

  init = action(() => {
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: '/placement-test-levels',
      query: {
        query: this.course && {
          course: this.course,
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.levels = orderBy(this.fetch.data, 'level');
      } else {
        this.levels = [];
      }
    });
  });

  handleFilterChange = action((value) => {
    this.course = value;
    this.load();
  });

  handleRemove = action((placementTestLevel) => {
    ConfirmationDialogService.show(
      'Delete Placement Test Level',
      `You are about to delete the Placement Test Level "${placementTestLevel.level}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/placement-test-levels/${placementTestLevel.id}`,
          method: 'delete',
        }).then(() => {
          NotificationService.addNotification(`Placement Test Level "${placementTestLevel.name}" deleted successfully.`, 'success');
          this.load();
        });
      });
  });
}

const placementTestLevelListService = new PlacementTestLevelListService();

export default placementTestLevelListService;
