import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestScheduleDialog from './CertificationTestScheduleDialog';
import CertificationTestScheduleFormService from '../services/CertificationTestScheduleFormService';

class CertificationTestScheduleDialogContainer extends Component {
  static propTypes = {
    certificationTest: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    onSuccess: PropTypes.func.isRequired,
  };

  certificationTestScheduleFormService = new CertificationTestScheduleFormService();
  componentDidMount() {
    this.certificationTestScheduleFormService.init(this.props.certificationTest, this.props.onSuccess);
  }

  render() {
    return (
      <CertificationTestScheduleDialog
        onOpen={this.certificationTestScheduleFormService.handleOpen}
        onChange={this.certificationTestScheduleFormService.form.setValue}
        onCancel={this.certificationTestScheduleFormService.handleCancel}
        isOpen={this.certificationTestScheduleFormService.isOpen}
        values={this.certificationTestScheduleFormService.form.getValues()}
        errors={this.certificationTestScheduleFormService.form.errors}
        submitting={this.certificationTestScheduleFormService.submit.fetching}
        onSubmitSchedule={this.certificationTestScheduleFormService.handleSubmitSchedule}
      />
    );
  }
}

export default observer(CertificationTestScheduleDialogContainer);
