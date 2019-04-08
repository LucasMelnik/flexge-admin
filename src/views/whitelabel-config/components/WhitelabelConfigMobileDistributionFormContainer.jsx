import React, { Component } from 'react';
import { observer } from 'mobx-react';
import WhitelabelConfigMobileDistributionForm from './WhitelabelConfigMobileDistributionForm';
import WhitelabelConfigMobileDistributionFormService from '../services/WhitelabelConfigMobileDistributionFormService';

class WhitelabelConfigMobileDistributionFormContainer extends Component {

  render() {
    return (
      <WhitelabelConfigMobileDistributionForm
        isOpen={WhitelabelConfigMobileDistributionFormService.isOpen}
        onDiscard={WhitelabelConfigMobileDistributionFormService.closeForm}
        onSubmit={WhitelabelConfigMobileDistributionFormService.handleSubmit}
        onChange={WhitelabelConfigMobileDistributionFormService.form.setValue}
        values={WhitelabelConfigMobileDistributionFormService.form.getValues()}
        errors={WhitelabelConfigMobileDistributionFormService.form.errors}
        submitting={WhitelabelConfigMobileDistributionFormService.submit.fetching}
        isDirty={WhitelabelConfigMobileDistributionFormService.form.isDirty}
      />
    );
  }
}

export default observer(WhitelabelConfigMobileDistributionFormContainer);
