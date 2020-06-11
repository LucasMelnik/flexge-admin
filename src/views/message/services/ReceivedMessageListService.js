import { action, extendObservable } from 'mobx';
import moment from 'moment';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import { browserHistory} from 'react-router';
import qs from 'qs';
import NotificationService from '../../../core/services/NotificationService';

class ReceivedMessageListService {
  fetch = new FetchService();
  filterForm = new FormService();

  constructor() {
    extendObservable(this, {
      messages: [],
      selectedMessages: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 15,
      },
    });
    this.filterForm.setInitialValues({
      from: moment().subtract(30, 'days'),
      to: moment(),
      status: 'null',
    });
  }

  init = action(() => {
    const params = qs.parse(window.location.search.substring(1));
    if (params.page) {
      this.pagination.current = parseInt(params.page);
    }

    this.messages = [];
    this.load(this.pagination);
  });

  load = action(page => {
    if (page && page.current) {
      this.pagination.current = page.current;
    } else {
      this.pagination.current = 1;
    }

    this.fetch
      .fetch({
        url: '/received-messages',
        query: {
          page: this.pagination.current,
          size: this.pagination.pageSize,
          query: {
            ...(this.filterForm.getValue('from') && {
              from: this.filterForm.getValue('from').toDate(),
            }),
            ...(this.filterForm.getValue('to') && {
              to: this.filterForm.getValue('to').toDate(),
            }),
            ...(this.filterForm.getValue('subject') && {
              subject: this.filterForm.getValue('subject'),
            }),
            ...(this.filterForm.getValue('memberId') && {
              sender: this.filterForm.getValue('memberId'),
            }),
            ...(this.filterForm.getValue('status') && this.filterForm.getValue('status') !== 'null' && {
              status: this.filterForm.getValue('status'),
            }),
          },
        },
      })
      .then(() => {
        if (this.fetch.data) {
          this.messages = this.fetch.data.docs;
          this.pagination.total = this.fetch.data.total;

          const params = qs.parse(window.location.search.substring(1));
          params.page = this.pagination.current;
          browserHistory.replace(`${window.location.pathname}?${qs.stringify(params)}`);
        } else {
          this.messages = [];
        }
      });
  });

  handleSelectMessage = action((selectedRows) => { this.selectedMessages = selectedRows });

  handleGroupMessages = action(() => {
    this.fetch
      .fetch({
        method: 'post',
        url: '/received-messages/group',
        body: {
          messages: this.selectedMessages
        }
      })
      .then(() => {
        if (this.fetch.data) {
          this.load();
          this.selectedMessages = [];
          NotificationService.addNotification(
            'Message successfully grouped.',
            'success',
          );
        } else {
          NotificationService.addNotification(
            this.fetch.error,
            'error',
          );
        }
      })
  });

  handleAssignMessage = action((message) => {
    this.fetch
      .fetch({
        method: 'patch',
        url: `/message-channels/${message.id}/assign-to-me`,
      })
      .then(() => {
        if (this.fetch.data) {
          this.messages = this.messages.map(m => {
            if (m.id === message.id) {
              return {
                ...m,
                members: [localStorage.role.id]
              };
            }
            return m;
          });
          NotificationService.addNotification(
            'Message successfully assigned.',
            'success',
          );
        } else {
          NotificationService.addNotification(
            this.fetch.error,
            'error',
          );
        }
      })
  });
}

const receivedMessageListService = new ReceivedMessageListService();

export default receivedMessageListService;
