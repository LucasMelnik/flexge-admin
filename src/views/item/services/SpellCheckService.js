import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class SpellCheckService {
  submit = new FetchService();

  constructor() {
    extendObservable(this, {
      words: [],
      status: '',
    });
  }

  handleSubmit = action((text, dictionary) => {
    if (dictionary) {
      Object.keys(dictionary).forEach(word => {
        text = text.replace(word, dictionary[word])
      });
    }
    this.submit.fetch({
      method: 'post',
      url: '/speech-recognition/validate',
      body: {
        text,
      },
    }).then(() => {
      if (this.submit.data) {
        this.status = 'OK';
      }
      if (this.submit.error) {
        this.words = this.submit.response.data.detail_message.split(',');
        this.status = 'ERROR';
      }
    });
  });
}
