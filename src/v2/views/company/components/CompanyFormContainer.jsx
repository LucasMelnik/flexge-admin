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
  };

  static defaultProps = {
    companyId: null,
  };

  componentWillMount() {
    CompanyFormService.handleLoad(this.props.companyId);
  }

  render() {
    return (
      <CompanyForm
        onSubmit={CompanyFormService.handleSubmit}
        onChange={CompanyFormService.form.setValue}
        onReset={CompanyFormService.form.reset}
        values={CompanyFormService.form.getValues()}
        errors={CompanyFormService.form.errors}
        submitting={CompanyFormService.fetch.fetching}
        error={CompanyFormService.submit.error}
        isDirty={CompanyFormService.form.isDirty}
        states={toJS(StateService.states)}
      />
    );
  }
}

export default observer(CompanyFormContainer);
