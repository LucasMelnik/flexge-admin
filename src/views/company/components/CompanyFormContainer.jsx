import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyForm from './CompanyForm';
import CompanyFormService from '../services/CompanyFormService';
import StateService from '../../../core/services/StateService';

class CompanyFormContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string,
    currentDistributor: PropTypes.string,
  };

  static defaultProps = {
    companyId: null,
    currentDistributor: null,
  };

  companyFormService = new CompanyFormService();
  componentWillMount() {
    this.companyFormService.handleLoad(this.props.companyId, this.props.currentDistributor);
  }

  render() {
    return (
      <CompanyForm
        onSubmit={this.companyFormService.handleSubmit}
        onChange={this.companyFormService.form.setValue}
        onReset={this.companyFormService.form.reset}
        values={this.companyFormService.form.getValues()}
        errors={this.companyFormService.form.errors}
        submitting={this.companyFormService.fetch.fetching}
        error={this.companyFormService.submit.error}
        isDirty={this.companyFormService.form.isDirty}
        states={toJS(StateService.states)}
        disableDistributor={!!this.props.currentDistributor}
      />
    );
  }
}

export default observer(CompanyFormContainer);
