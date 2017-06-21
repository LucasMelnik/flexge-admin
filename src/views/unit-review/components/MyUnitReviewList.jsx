import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const UnitReviewList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'unit.name',
          },
          {
            label: 'Module',
            path: 'unit.module.name',
          },
          {
            label: 'Status',
            path: 'review.status',
          },
        ]}
        rows={props.units}
        onSendReview={row => props.onSendReview(row.unit)}
      />
    </Async>
  </Paper>
);

UnitReviewList.propTypes = {
  onSendReview: PropTypes.func,
  units: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

UnitReviewList.defaultProps = {
  onSendReview: null,
};

export default UnitReviewList;
