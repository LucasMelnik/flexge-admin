import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ProfileForm from './ProfileForm';
import ProfileFormService from '../services/ProfileFormService';

class ProfileFormContainer extends Component {

  profileFormService = new ProfileFormService();
  componentWillMount() {
    this.profileFormService.handleLoad();
  }

  render() {
    return (
      <ProfileForm
        onSubmit={this.profileFormService.handleSubmit}
        onChangePicture={this.profileFormService.handleChangePicture}
        onChange={this.profileFormService.form.setValue}
        onReset={this.profileFormService.form.reset}
        values={this.profileFormService.form.getValues()}
        errors={this.profileFormService.form.errors}
        submitting={this.profileFormService.submit.fetching}
        error={this.profileFormService.submit.error}
        isDirty={this.profileFormService.form.isDirty}
      />
    );
  }
}

export default observer(ProfileFormContainer);
