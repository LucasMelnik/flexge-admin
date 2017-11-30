import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class StudentPlacementListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      placements: [],
      studentId: '',
    });
  }

  init = action((studentId) => {
    this.placements = [];
    this.studentId = studentId;
    this.loadPlacements();
  });

  loadPlacements = action(() => {
    this.fetch.fetch({
      url: `/students/${this.studentId}/placement-tests`,
    }).then(() => {
      if (this.fetch.data) {
        this.placements = this.fetch.data;
      } else {
        this.placements = [];
      }
    });
  });

  handleRemove = action((placement) => {
    ConfirmationDialogService.show(
      'Delete Placement Test',
      'You are about to delete the placement test, Do you want to continue ?',
      () => {
        this.fetch.fetch({
          url: `/students/${this.studentId}/placement-tests/${placement.id}`,
          method: 'delete',
        }).then(() => {
          this.loadPlacements();
        });
      });
  });
}

const studentPlacementListService = new StudentPlacementListService();

export default studentPlacementListService;
