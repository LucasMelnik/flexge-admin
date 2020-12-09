import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ContentVideoUploadService from '../services/ContentVideoUploadService';
import ContentVideoUploadDialog from './ContentVideoUploadDialog';

class ContentVideoUploadDialogContainer extends Component {

  render() {
    return (
      <ContentVideoUploadDialog
        values={ContentVideoUploadService.form.getValues()}
        isOpen={ContentVideoUploadService.isOpen}
      />
    );
  }
}

export default observer(ContentVideoUploadDialogContainer);
