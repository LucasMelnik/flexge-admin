import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UserForm from './UserForm';
import UserFormService from '../services/UserFormService';

class UserFormContainer extends Component {

  static propTypes = {
    userId: PropTypes.string,
    companyId: PropTypes.string.isRequired,
    roleUser: PropTypes.string,
  }

  static defaultProps = {
    userId: null,
    roleUser: null,
  }

  componentWillMount() {
    UserFormService.handleLoad(this.props.userId, this.props.companyId);
  }

  render() {
    return (
      <UserForm
        roleUser={this.props.roleUser}
        onSubmit={UserFormService.handleSubmit}
        onChange={UserFormService.form.setValue}
        onReset={UserFormService.form.reset}
        values={UserFormService.form.getValues()}
        errors={UserFormService.form.errors}
        submitting={UserFormService.fetch.fetching}
        error={UserFormService.submit.error}
        isDirty={UserFormService.form.isDirty}
      />
    );
  }
}

export default observer(UserFormContainer);
