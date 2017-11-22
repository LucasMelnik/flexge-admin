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
    type: PropTypes.oneOf(['ADMIN','DISTRIBUTOR', 'COMPANY']).isRequired,
  };

  static defaultProps = {
    userId: null,
    companyId: undefined,
    distributorId: undefined,
  };

  componentWillMount() {
    UserFormService.handleLoad(this.props.userId, this.props.companyId, this.props.distributorId);
  }

  render() {
    return (
      <UserForm
        type={this.props.type}
        onSubmit={UserFormService.handleSubmit}
        onChange={UserFormService.form.setValue}
        onReset={UserFormService.form.reset}
        values={UserFormService.form.getValues()}
        errors={UserFormService.form.errors}
        submitting={UserFormService.fetch.fetching}
        isDirty={UserFormService.form.isDirty}
      />
    );
  }
}

export default observer(UserFormContainer);
