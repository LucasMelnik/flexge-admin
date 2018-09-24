import { action, extendObservable } from 'mobx';
import orderBy from 'lodash/orderBy';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';

class ContentItemListService {
  fetch = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      unitItems: [],
      items: [],
      contentId: null,
    });
    this.form.setInitialValues({
      type: 1,
    });
  }

  init = action((contentId) => {
    this.contentId = contentId;
    this.items = [];
    this.unitItems = [];
    this.form.setInitialValues({
      type: 1,
    });
    this.load();
  });

  handleFilterChange = action(() => {
    this.items = this.unitItems.filter(unitItem => unitItem.group === this.form.getValue('type') || unitItem.group === 1)
      .map(unitItem => unitItem.item).map(item => ({
        ...item,
        linkedAnswers: orderBy(item.answers, 'index').reduce((result, answer) => {
          if (result.find(resultAnswer => answer.index && resultAnswer.linkTo === answer.index)) {
            return [
              ...result.map((resultAnswer) => {
                if (resultAnswer.linkTo === answer.index) {
                  return {
                    ...resultAnswer,
                    linkTo: answer.linkTo,
                    text: resultAnswer.text.concat(' ').concat(answer.text),
                  };
                }
                return resultAnswer;
              }),
            ];
          }
          return [
            ...result,
            answer,
          ];
        }, []),
      }));
  });

  load = action(() => {
    this.fetch.fetch({
      url: `/units/${this.contentId}/items`,
    }).then(() => {
      if (this.fetch.data) {
        this.unitItems = orderBy(this.fetch.data, 'order', 'asc');
        this.items = this.unitItems.filter(unitItem => unitItem.group === this.form.getValue('type'))
          .map(unitItem => unitItem.item).map(item => ({
            ...item,
            linkedAnswers: orderBy(item.answers, 'index').reduce((result, answer) => {
              if (result.find(resultAnswer => answer.index && resultAnswer.linkTo === answer.index)) {
                return [
                  ...result.map((resultAnswer) => {
                    if (resultAnswer.linkTo === answer.index) {
                      return {
                        ...resultAnswer,
                        linkTo: answer.linkTo,
                        text: resultAnswer.text.concat(' ').concat(answer.text),
                      };
                    }
                    return resultAnswer;
                  }),
                ];
              }
              return [
                ...result,
                answer,
              ];
            }, []),
          }));
      } else {
        this.items = [];
      }
    });
  });
}

const contentItemListService = new ContentItemListService();

export default contentItemListService;
