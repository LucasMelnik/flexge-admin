import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SuspectUsageAlertFormDialog from './SuspectUsageAlertFormDialog';
import SuspectUsageAlertListService from '../services/SuspectUsageAlertListService';

class SuspectUsageAlertFormDialogContainer extends Component {

  render() {
    return (
      <SuspectUsageAlertFormDialog
        onChange={SuspectUsageAlertListService.reviewForm.setValue}
        onClose={SuspectUsageAlertListService.discardReview}
        isOpen={SuspectUsageAlertListService.isReviewOpen}
        values={SuspectUsageAlertListService.reviewForm.getValues()}
        errors={SuspectUsageAlertListService.reviewForm.errors}
        isDirty={SuspectUsageAlertListService.reviewForm.isDirty}
        submitting={SuspectUsageAlertListService.submit.fetching}
        onSubmit={SuspectUsageAlertListService.handleReview}
        onReset={SuspectUsageAlertListService.reviewForm.reset}
      />
    );
  }
}

export default observer(SuspectUsageAlertFormDialogContainer);
