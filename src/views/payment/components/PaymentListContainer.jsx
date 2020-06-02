import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PaymentList from './PaymentList';
import PaymentListService from '../services/PaymentListService';

class PaymentListContainer extends Component {

  propTypes = {
    studentId: PropTypes.string,
  };

  defaultProps = {
    studentId: null,
  };

  componentDidMount() {
    PaymentListService.init(this.props.studentId);
  }

  render() {
    return (
      <PaymentList
        payments={toJS(PaymentListService.payments)}
        pagination={toJS(PaymentListService.pagination)}
        fetching={PaymentListService.fetch.fetching}
        onChange={PaymentListService.load}
      />
    );
  }
}

export default observer(PaymentListContainer);
