import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CertificationTestReviewItemFormDialog from './CertificationTestReviewItemFormDialog';
import CertificationTestReviewItemFormService from '../services/CertificationTestReviewItemFormService';

class CertificationTestReviewItemFormDialogContainer extends Component {

  render() {
    return (
      <CertificationTestReviewItemFormDialog
        onChange={CertificationTestReviewItemFormService.form.setValue}
        onClose={CertificationTestReviewItemFormService.handleClose}
        isOpen={CertificationTestReviewItemFormService.isOpen}
        values={CertificationTestReviewItemFormService.form.getValues()}
        errors={CertificationTestReviewItemFormService.form.errors}
        isDirty={CertificationTestReviewItemFormService.form.isDirty}
        submitting={CertificationTestReviewItemFormService.submit.fetching}
        onSubmit={CertificationTestReviewItemFormService.handleSubmit}
        onReset={CertificationTestReviewItemFormService.form.reset}
      />
    );
  }
}

export default observer(CertificationTestReviewItemFormDialogContainer);
