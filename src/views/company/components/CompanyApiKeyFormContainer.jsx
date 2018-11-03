import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyApiKeyForm from './CompanyApiKeyForm';
import CompanyApiKeyFormService from '../services/CompanyApiKeyFormService';

class CompanyApiKeyFormContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string.isRequired,
  };

  companyApiKeyFormService = new CompanyApiKeyFormService();
  componentWillMount() {
    this.companyApiKeyFormService.handleLoad(this.props.companyId);
  }

  render() {
    return (
      <CompanyApiKeyForm
        onSubmit={this.companyApiKeyFormService.handleSubmit}
        onChange={this.companyApiKeyFormService.form.setValue}
        values={this.companyApiKeyFormService.form.getValues()}
        submitting={this.companyApiKeyFormService.fetch.fetching}
      />
    );
  }
}

export default observer(CompanyApiKeyFormContainer);
