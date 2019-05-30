import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import round from 'lodash/round';
import FetchService from '../../../core/services/FetchService';
import CertificationTestReviewFormService from './CertificationTestReviewFormService';

export default class CertificationTestExecutionAbilityItemListService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      items: [],
    });
  }

  load = action((ability, certificationTestId) => {
    this.fetch.fetch({
      method: 'get',
      url: `/certification-test/${certificationTestId}/${ability}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.items = orderBy(this.fetch.data, 'order', 'asc');
      }
      if ((ability === 'SPEAKING' || ability === 'WRITING') && !this.items.find(item => item.correct === null || item.correct === undefined)) {
        const score = round((this.items.reduce((acc, item) => acc + item.reviewerScore, 0) / this.items.length));
        CertificationTestReviewFormService.form.setValue(`${ability.toLowerCase()}Score`, score);
      }
      if (this.fetch.error) {
        this.items = [];
      }
    });
  });
}
