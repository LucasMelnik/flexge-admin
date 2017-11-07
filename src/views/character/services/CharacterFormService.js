import { extendObservable, action } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import FormService from '../../../core/services/FormService';
import NotificationService from '../../../core/services/NotificationService';
import { isRequired } from '../../../core/validations';

class CharacterFormService {
  fetch = new FetchService();
  submit = new FetchService();
  form = new FormService();

  constructor() {
    extendObservable(this, {
      characterId: null,
    });
    this.form.validations = {
      name: [isRequired],
    };
  }

  handleLoad = action((characterId) => {
    this.form.reset();
    if (characterId) {
      this.fetch.fetch({
        url: `/characters/${characterId}`,
      }).then(() => {
        if (this.fetch.data) {
          this.form.setInitialValues(this.fetch.data);
        }
      });
    } else {
      this.form.setInitialValues({});
    }
    this.characterId = characterId;
  });

  handleSubmit = action(() => {
    this.form.submitted = true;
    if (this.form.errors) {
      window.showErrorMessage('Fill the required fields');
      return;
    }
    const characterId = this.form.getValue('id');
    this.submit.fetch({
      method: characterId ? 'put' : 'post',
      url: characterId ? `/characters/${characterId}` : '/characters',
      body: {
        ...this.form.getValues(),
      },
    }).then(() => {
      if (this.submit.data) {
        const character = this.submit.data;
        this.characterId = character.id;
        this.form.reset();
        this.form.setInitialValues(character);

        window.showSuccess(`Character ${characterId ? 'updated' : 'created'} successfully.`);
      }
      if (this.submit.error) {
        NotificationService.addNotification(
          `Error ${characterId ? 'updating' : 'creating'} character.`,
          null,
          null,
          'error',
        );
      }
    });
  });
}

const characterFormService = new CharacterFormService();

export default characterFormService;
