import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Paginator from '../../../core/navigation/Paginator';

const UnitListPagination = props => (
  <Paper
    style={{
      padding: 10,
      textAlign: 'center',
    }}
  >
    <Paginator
      pageCount={props.pageCount}
      onPageChange={props.onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
    />
  </Paper>
);

UnitListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default UnitListPagination;
