import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DistributorManagerForm from './DistributorManagerForm';
import DistributorManagerFormService from '../services/DistributorManagerFormService';

class DistributorManagerFormContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    DistributorManagerFormService.setInitialValues(this.props.distributorId);
  }

  render() {
    return (
      <DistributorManagerForm
        onSubmit={DistributorManagerFormService.handleSubmit}
        onChange={DistributorManagerFormService.form.setValue}
        values={DistributorManagerFormService.form.getValues()}
        errors={DistributorManagerFormService.form.errors}
        submitting={DistributorManagerFormService.fetch.fetching}
        error={DistributorManagerFormService.fetch.error}
        isDirty={DistributorManagerFormService.form.isDirty}
      />
    );
  }
}

export default observer(DistributorManagerFormContainer);
