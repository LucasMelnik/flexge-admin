import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PaymentForm from './UnitTypeForm';
import PaymentFormService from '../services/UnitTypeFormService';

class PaymentFormContainer extends Component {

  static propTypes = {
    typeId: PropTypes.string,
  };

  static defaultProps = {
    typeId: null,
  };

  unitTypeFormService = new PaymentFormService();
  componentWillMount() {
    this.unitTypeFormService.handleLoad(this.props.typeId);
  }

  render() {
    return (
      <PaymentForm
        onSubmit={this.unitTypeFormService.handleSubmit}
        onChange={this.unitTypeFormService.form.setValue}
        onReset={this.unitTypeFormService.form.reset}
        values={this.unitTypeFormService.form.getValues()}
        errors={this.unitTypeFormService.form.errors}
        submitting={this.unitTypeFormService.fetch.fetching}
        isDirty={this.unitTypeFormService.form.isDirty}
      />
    );
  }
}

export default observer(PaymentFormContainer);
