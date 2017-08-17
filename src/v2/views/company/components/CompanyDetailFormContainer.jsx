import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CompanyDetailForm from './CompanyDetailForm';
import CompanyDetailFormService from '../services/CompanyDetailFormService';
import StateService from '../../../core/services/StateService';

class CompanyDetailFormContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string,
  };

  static defaultProps = {
    companyId: null,
  };

  componentWillMount() {
    CompanyDetailFormService.handleLoad(this.props.companyId);
  }

  render() {
    return (
      <CompanyDetailForm
        values={CompanyDetailFormService.form.getValues()}
        submitting={CompanyDetailFormService.fetch.fetching}
        states={toJS(StateService.states)}
      />
    );
  }
}

export default observer(CompanyDetailFormContainer);
