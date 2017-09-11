import { action, extendObservable } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';

class UnitListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      units: [],
      filter: '',
      moduleId: null,
    });
  }

  init = action((moduleId) => {
    this.moduleId = moduleId;
    this.filter = '';
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/units`,
      query: {
        query: {
          name: {
            $regex: this.form.getValue('filter'),
            $options: 'i',
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.units = orderBy(this.fetch.data, ['group', 'order'], ['asc', 'asc'])
          .map((unit) => {
            if (!unit.review) {
              return {
                ...unit,
                review: { status: 'NOT SENT TO REVIEW' },
              };
            }
            return unit;
          })
          .filter(unit => {
            if (this.form.getValue('onlyWithImages')) {
              return unit.type.name.toLowerCase() !== 'review' &&
                unit.type.itemsType.find(itemType => ['PRESENTATION', 'SINGLE_CHOICE_IMAGE'].find(type => itemType.key === type));
            }
            return true;
          });
      } else {
        this.units = [];
      }
    });
  });

  handleRemove = action((unit) => {
    ConfirmationDialogService.show(
      `Delete unit ${unit.name}`,
      `You are about to delete the unit "${unit.name}", Do you want to continue ?`,
      () => {
        this.fetch.fetch({
          url: `/modules/${unit.module}/units/${unit.id}`,
          method: 'delete',
        }).then(() => {
          this.load();
        });
      });
  });
}

const unitListService = new UnitListService();

export default unitListService;
