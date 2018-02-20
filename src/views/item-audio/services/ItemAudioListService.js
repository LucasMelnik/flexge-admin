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
        pageSize: 25,
      },
    });
  }

  init = action(() => {
    this.items = [];
    this.pagination = {
      current: 1,
      total: 0,
      pageSize: 25,
    };
    this.load();
  });

  load = action((page) => {
    if (page && page.current) {
      this.pagination.current = page.current;
    } else {
      this.pagination.current = 1;
    }

    this.fetch.fetch({
      url: `/item-audio-reviews?page=${this.pagination.current}&size=${this.pagination.pageSize}`,
      query: {
        query: {
          ...this.form.getValue('status') && {
            statusAudio: this.form.getValue('status'),
          },
          ...this.form.getValue('hasAudio') && {
            hasAudio: this.form.getValue('hasAudio'),
          },
          ...this.form.getValue('character') && {
            character: this.form.getValue('character'),
          },
          ...this.form.getValue('text') && {
            text: {
              $regex: this.form.getValue('text').trim(),
              $options: 'i',
            },
          },
        },
      },
    }).then(() => {
      if (this.fetch.data) {
        this.pagination.total = this.fetch.data.total;
        if (this.form.getValue('character')) {
          const char = `Total Words: ${this.fetch.data.wordCount.toString()} / Total Phrases: ${this.fetch.data.phraseCount.toString()} / `;
          this.pagination.showTotal = total => `${char} Total ${total} registers`;
        } else {
          this.pagination.showTotal = total => `Total ${total} registers`;
        }
        this.items = this.fetch.data.docs;
      } else {
        this.items = [];
        this.pagination = {
          current: 1,
          total: 0,
          pageSize: 25,
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
