import React from 'react';
import PropTypes from 'prop-types';
import Paginator from '../../../core/navigation/Paginator';

const CompanyManagerListPagination = props => (
  <Paginator
    pageCount={props.pageCount}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
    onPageChange={props.onPageChange}
  />
);

CompanyManagerListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CompanyManagerListPagination;