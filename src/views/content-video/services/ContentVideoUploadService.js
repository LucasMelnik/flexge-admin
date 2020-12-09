import * as tus from 'tus-js-client';
import { extendObservable, action } from 'mobx';
import FormService from '../../../core/services/FormService';

class ContentVideoUploadService {
  form = new FormService();

  constructor() {
    extendObservable({
      isOpen: false,
    });
  }

  init = action(() => {
    this.form.reset();
    this.form.setInitialValues({});
  });

  handleUpload = action((file, uploadUrl) => {
    this.isOpen = true;
    return new Promise((resolve, reject) => {
      const uploader = new tus.Upload(file, {
        uploadUrl: uploadUrl,
        onProgress: this.handleUploadProgress,
        onError: function (error) {
          reject(error);
        },
        onSuccess: function () {
          resolve();
        }
      });
      uploader.start();
    });
  });

  handleUploadProgress = action((bytesUploaded, bytesTotal) => {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
    this.form.setValue('uploadPercentage', percentage);
    if (percentage >= 100) {
      this.isOpen = false;
    }
  });
}

const contentVideoUploadService = new ContentVideoUploadService();

export default contentVideoUploadService;