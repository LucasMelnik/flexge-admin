import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PaymentForm from './PaymentForm';
import PaymentFormService from '../services/PaymentFormService';

class PaymentFormContainer extends Component {

  static propTypes = {
    paymentId: PropTypes.string,
  };

  static defaultProps = {
    paymentId: null,
  };

  paymentFormService = new PaymentFormService();
  componentWillMount() {
    this.paymentFormService.handleLoad(this.props.paymentId);
  }

  render() {
    return (
      <PaymentForm
        onSubmit={this.paymentFormService.handleSubmit}
        onChange={this.paymentFormService.form.setValue}
        onReset={this.paymentFormService.form.reset}
        values={this.paymentFormService.form.getValues()}
        errors={this.paymentFormService.form.errors}
        submitting={this.paymentFormService.fetch.fetching}
        isDirty={this.paymentFormService.form.isDirty}
      />
    );
  }
}

export default observer(PaymentFormContainer);
