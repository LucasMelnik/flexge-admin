import React from 'react';
import PropTypes from 'prop-types';
import Paginator from '../../../core/navigation/Paginator';

const DistributorManagerListPagination = props => (
  <Paginator
    pageCount={props.pageCount}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    onPageChange={props.onPageChange}
  />
);

DistributorManagerListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default DistributorManagerListPagination;
