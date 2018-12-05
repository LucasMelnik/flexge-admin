import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

export default class InstructionFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      itemTypeId: null,
      instructionId: null,
      onSuccess: null,
    });
    this.form.validations = {
      text: [isRequired],
      locale: [isRequired],
    };
  }

  handleLoad = action((itemTypeId, instructionId, onSuccess) => {
    this.form.reset();
    if (instructionId) {
      this.fetch.fetch({
        url: `/item-types/${itemTypeId}/instructions/${instructionId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.itemTypeId = itemTypeId;
    this.instructionId = instructionId;
    this.onSuccess = onSuccess;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      NotificationService.addNotification('Fill the required fields', 'error');
      return;
    }

    const fileData = new FormData();
    fileData.append('file', this.form.getValue('files')[0]);
    fileData.append('text', this.form.getValue('text'));
    fileData.append('locale', this.form.getValue('locale'));

    const instructionId = this.form.getValue('id');
    this.submit.fetch({
      method: instructionId ? 'put' : 'post',
      url: instructionId ? `/item-types/${this.itemTypeId}/instructions/${instructionId}` : `/item-types/${this.itemTypeId}/instructions`,
      body: fileData,
    }).then(() => {
      if (this.submit.data) {
        this.form.reset();
        if (this.onSuccess) {
          this.onSuccess();
        }
        NotificationService.addNotification(`Instruction ${this.instructionId ? 'updated' : 'created'} successfully.`, 'success');
      }
      if (this.submit.error) {
        NotificationService.addNotification(`Error ${this.instructionId ? 'updating' : 'creating'} instruction.`, 'error');
      }
    });
  });
}
