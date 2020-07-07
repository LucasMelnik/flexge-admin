import { action, extendObservable, computed, toJS } from 'mobx';
import { orderBy } from 'lodash';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import ConfirmationDialogService from '../../../core/services/ConfirmationDialogService';
import NotificationService from '../../../core/services/NotificationService';
import axios from 'axios';

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

  handleCopyToProduction = action((unitId) => {
    this.fetch.fetch({
      url: `/units/${unitId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        const unitItems = toJS(this.fetch.data).map(unitItem => {
          unitItem.item.type = unitItem.item.type.id;
          if (unitItem.item.grammar && unitItem.item.grammar.id) {
            unitItem.item.grammar = unitItem.item.grammar.id
          } else {
            unitItem.item.grammar = null;
          }
          if (unitItem.item.audio) {
            unitItem.item.audioFrom = `staging-flexge-files/${unitItem.item.audio}`
          }
          if (unitItem.item.image) {
            unitItem.item.imageFrom = `staging-flexge-files/${unitItem.item.image}`
          }
          if (unitItem.item.postPhraseAudio) {
            unitItem.item.postPhraseAudioFrom = `staging-flexge-files/${unitItem.item.postPhraseAudio}`
          }
          if (unitItem.item.postPhraseImage) {
            unitItem.item.postPhraseImageFrom = `staging-flexge-files/${unitItem.item.postPhraseImage}`
          }
          if (unitItem.item.titleAudio) {
            unitItem.item.titleAudioFrom = `staging-flexge-files/${unitItem.item.titleAudio}`
          }
          if (unitItem.item.answers && unitItem.item.answers.length) {
            unitItem.item.answers = unitItem.item.answers.map(async (answer) => {
              if (answer.audio) {
                answer.audioFrom = `staging-flexge-files/${answer.audio}`
              }
              if (answer.image) {
                answer.imageFrom = `staging-flexge-files/${answer.image}`
              }
              return answer
            });
          }
          return unitItem;
        });

        axios.request({
          method: 'put',
          url: `https://api.flexge.com/public/units/${unitId}/copy-items`,
          headers: {
            Authorization: `Bearer ${localStorage.accessToken}`,
          },
          data: {
            id: unitId,
            unitItems
          }
        }).then(() => {
          NotificationService.addNotification('Unit sent to production.', 'success');
        }).catch(() => {
          NotificationService.addNotification('Error to send unit to production', 'error');
        });
      }
    })
  });
}

const unitListService = new UnitListService();

export default unitListService;
