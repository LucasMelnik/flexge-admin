import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Paginator from '../../../core/navigation/Paginator';

const StudentListPagination = props => (
  <Card
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
  </Card>
);

StudentListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default StudentListPagination;
