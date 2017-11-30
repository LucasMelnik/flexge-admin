import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DistributorForm from './DistributorForm';
import DistributorFormService from '../services/DistributorFormService';

class DistributorFormContainer extends Component {

  static propTypes = {
    distributorId: PropTypes.string,
  };

  static defaultProps = {
    distributorId: null,
  };

  distributorFormService = new DistributorFormService();
  componentWillMount() {
    this.distributorFormService.handleLoad(this.props.distributorId);
  }

  render() {
    return (
      <DistributorForm
        onSubmit={this.distributorFormService.handleSubmit}
        onChange={this.distributorFormService.form.setValue}
        onReset={this.distributorFormService.form.reset}
        values={this.distributorFormService.form.getValues()}
        errors={this.distributorFormService.form.errors}
        submitting={this.distributorFormService.submit.fetching}
        error={this.distributorFormService.submit.error}
        isDirty={this.distributorFormService.form.isDirty}
      />
    )
  }
}

export default observer(DistributorFormContainer);
