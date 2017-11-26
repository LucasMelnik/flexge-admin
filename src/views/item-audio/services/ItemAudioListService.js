import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';

class ItemAudioListService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      items: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
      },
    });
  }

  init = action(() => {
    this.items = [];
    this.pagination = {
      current: 1,
      total: 0,
      pageSize: 15,
    };
    this.load();
  });

  load = action((page) => {
    if (page && page.current) {
      this.pagination.current = page.current;
    }

    this.fetch.fetch({
      url: `/item-audio-reviews?page=${this.pagination.current}`,
      query: {
        query: {
          ...this.form.getValue('status') && {
            statusAudio: this.form.getValue('status'),
          },
          ...this.form.getValue('hasAudio') && {
            audio: { [this.form.getValue('hasAudio')]: 'null' },
          },
          ...this.form.getValue('character') && {
            character: this.form.getValue('character'),
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.pagination.total = this.fetch.data.total;
        this.items = this.fetch.data.docs;
      } else {
        this.items = [];
        this.pagination = {
          current: 1,
          total: 0,
          pageSize: 15,
        };
      }
    });
  });

  handleAudioUpload = (key, item) => {
    this.submit = new FetchService();
    this.submit.fetch({
      url: `/item-audio-reviews/${item.itemId || item.id}/audio`,
      method: 'put',
      body: {
        audio: key,
        statusAudio: 'PENDING',
        type: item.type,
        typeId: item.id,
      },
    }).then(() => {
      if (this.submit.data) {
        NotificationService.addNotification(
          'Audio uploaded.',
          'success',
        );
        this.load();
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          'Error to update the audio',
          'error',
        );
      }
    });
  };
}

const itemAudioListService = new ItemAudioListService();

export default itemAudioListService;
