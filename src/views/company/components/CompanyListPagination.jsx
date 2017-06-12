import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Paginator from '../../../core/navigation/Paginator';

const CompanyListPagination = props => (
  <Paper
    flexible
    style={{
      padding: 10,
      textAlign: 'center',
    }}
  >
    <Paginator
      pageCount={props.pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      onPageChange={props.onPageChange}
    />
  </Paper>
);

CompanyListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CompanyListPagination;
