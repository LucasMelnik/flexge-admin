import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import EmailConfigForm from './EmailConfigForm';
import EmailConfigFormService from '../services/EmailConfigFormService';

class EmailConfigFormContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  emailConfigFormService = new EmailConfigFormService();
  componentWillMount() {
    this.emailConfigFormService.init(this.props.schoolId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.schoolId !== this.props.schoolId) {
      this.emailConfigFormService.init(nextProps.schoolId);
    }
  }

  render() {
    return (
      <EmailConfigForm
        onSubmit={this.emailConfigFormService.handleSubmit}
        onChange={this.emailConfigFormService.form.setValue}
        onReset={this.emailConfigFormService.form.reset}
        values={this.emailConfigFormService.form.getValues()}
        errors={this.emailConfigFormService.form.errors}
        submitting={
          this.emailConfigFormService.submit.fetching ||
          this.emailConfigFormService.fetch.fetching
        }
        isDirty={this.emailConfigFormService.form.isDirty}
      />
    );
  }
}

export default observer(EmailConfigFormContainer);
