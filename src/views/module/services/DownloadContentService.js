import { action, extendObservable } from 'mobx';
import FetchService from '../../../core/services/FetchService';

export default class DownloadContentService {
  download = new FetchService();

  constructor() {
    extendObservable(this, {});
  }

  handleDownload = action((moduleId) => {
    this.download
      .fetch({
        responseType: 'blob',
        url: `/modules/${moduleId}/content-export`,
      })
      .then(() => {
        if (this.download.data) {
          const link = document.createElement('a');
          const fileUrl = window.URL.createObjectURL(this.download.data);
          link.href = fileUrl;

          link.download = `content-export.csv`;
          link.click();
          setTimeout(() => window.URL.revokeObjectURL(fileUrl), 500);
        }
      });
  });
}