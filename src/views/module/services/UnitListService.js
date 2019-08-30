import { action, extendObservable, computed } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';

class UnitListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      units: [],
      moduleId: null,
      reorderSubmitting: false,
      visibleUnits: computed(() => this.units.filter(unit => {
        if (this.form.getValue('onlyWithImages') === 'true') {
          return unit.type.name.toLowerCase() !== 'review' &&
            unit.type.itemsType.find(itemType => ['PRESENTATION', 'SINGLE_CHOICE_IMAGE'].find(type => itemType.key === type));
        }
        if (this.form.getValue('filter')) {
          return unit.name.search(new RegExp(this.form.getValue('filter'), 'i')) > -1
        }
        return unit;
      })),
    });
  }

  init = action((moduleId) => {
    this.units = [];
    this.moduleId = moduleId;
    this.form.setInitialValues({ onlyWithImages: 'false' });
    this.load();
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/modules/${this.moduleId}/units`,
    }).then(() => {
      if (this.fetch.data) {
        this.reorderSubmitting = false;
        this.units = orderBy(this.fetch.data, ['group', 'order'], ['asc', 'asc'])
          .map((unit) => {
            if (!unit.review || !unit.review.id) {
              return {
                ...unit,
                review: { status: 'NOT SENT TO REVIEW' },
              };
            }
            return unit;
          })
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
          if (this.fetch.data) {
            NotificationService.addNotification('Unit deleted.', 'success');
            this.load();
          }
          if (this.fetch.error) {
            NotificationService.addNotification(this.fetch.error, 'error');
          }
        });
      });
  });

  handleAutoReorder = action((startIndex, reorderAction) => {
    this.reorderSubmitting = true;

    const reorderPromises = [];
    this.units.forEach((unit, index) => {
      const body = {
        id: unit.id,
        name: unit.name,
        module: unit.module,
        type: unit.type.id,
        order: unit.order,
        group: unit.group,
        scoreToPass: unit.scoreToPass,
        createdBy: unit.createdBy,
        difficulty: unit.difficulty,
      };

      if (reorderAction === 'ADD_LINE' && index >= startIndex) {
        body.order = unit.order + 1;
      } else if (reorderAction === 'REMOVE_LINE' && index >= startIndex) {
        body.order = unit.order - 1;
      }

      reorderPromises.push(
        this.submit.fetch({
          url: `/modules/${unit.module}/units/${unit.id}`,
          method: 'put',
          body,
        }),
      );
    });

    Promise.all(reorderPromises)
      .then(() => this.load());
  });
}

const unitListService = new UnitListService();

export default unitListService;
