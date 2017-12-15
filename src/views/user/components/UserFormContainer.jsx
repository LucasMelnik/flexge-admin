import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UserForm from './UserForm';
import UserFormService from '../services/UserFormService';

class UserFormContainer extends Component {

  static propTypes = {
    userId: PropTypes.string,
    companyId: PropTypes.string,
    distributorId: PropTypes.string,
    type: PropTypes.oneOf(['ADMIN','DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']).isRequired,
  };

  static defaultProps = {
    userId: null,
    companyId: undefined,
    distributorId: undefined,
  };

  userFormService = new UserFormService();
  componentWillMount() {
    this.userFormService.handleLoad(this.props.userId, this.props.companyId, this.props.distributorId);
  }

  render() {
    return (
      <UserForm
        type={this.props.type}
        onSubmit={this.userFormService.handleSubmit}
        onChange={this.userFormService.form.setValue}
        onReset={this.userFormService.form.reset}
        values={this.userFormService.form.getValues()}
        errors={this.userFormService.form.errors}
        submitting={this.userFormService.submit.fetching}
        isDirty={this.userFormService.form.isDirty}
        companyId={this.props.companyId}
      />
    );
  }
}

export default observer(UserFormContainer);
