import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Button from '../../../core/form/Button';
import StudentSendWelcomeEmailService from '../services/StudentSendWelcomeEmailService';

class StudentSendWelcomeEmailButtonContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentSendWelcomeEmailService = new StudentSendWelcomeEmailService();
  componentWillMount() {
    this.studentSendWelcomeEmailService.init(this.props.studentId);
  }

  render() {
    return (
      <Button
        loading={this.studentSendWelcomeEmailService.submit.fetching}
        disabled={this.studentSendWelcomeEmailService.submit.fetching}
        onClick={this.studentSendWelcomeEmailService.handleSend}
        label="Send new password"
        icon="key"
      />
    );
  }
}

export default observer(StudentSendWelcomeEmailButtonContainer);
