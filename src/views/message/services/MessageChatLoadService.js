import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class MessageChatLoadService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      messageChannel: {},
    });
  }

  handleLoad = action((id) => {
    this.fetch.fetch({
      method: 'get',
      url: `/message-channels/${id}`,
    }).then(() => {
      if (this.fetch.data) {
        this.messageChannel = this.fetch.data;
      }
      if (this.fetch.error) {
        this.messageChannel = {};
      }
    });
  });
}
