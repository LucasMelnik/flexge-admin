import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DistributorForm from './DistributorForm';
import DistributorFormService from '../services/DistributorFormService';

class DistributorFormContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
  }

  static defaultProps = {
    distributorId: null,
  }

  componentWillMount() {
    DistributorFormService.handleLoad(this.props.distributorId);
  }

  render() {
    return (
      <DistributorForm
        onSubmit={DistributorFormService.handleSubmit}
        onChange={DistributorFormService.form.setValue}
        onReset={DistributorFormService.form.reset}
        values={DistributorFormService.form.getValues()}
        errors={DistributorFormService.form.errors}
        submitting={DistributorFormService.fetch.fetching}
        error={DistributorFormService.fetch.error}
        isDirty={DistributorFormService.form.isDirty}
      />
    )
  }
}

export default observer(DistributorFormContainer);
