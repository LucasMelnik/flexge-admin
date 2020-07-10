import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UploadContentForm from './UploadContentForm';
import UploadContentService from '../services/UploadContentService';

class UploadContentFormContainer extends Component {

  render() {
    return (
      <UploadContentForm
        onUpload={UploadContentService.handleUpload}
        onChange={UploadContentService.form.setValue}
        values={UploadContentService.form.getValues()}
        errors={UploadContentService.form.errors}
        submitting={UploadContentService.submit.fetching}
      />
    );
  }
}

export default observer(UploadContentFormContainer);
