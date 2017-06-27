import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Paginator from '../../../../core/navigation/Paginator';

const UnitListPagination = props => (
  <Block textAlign="center">
    <Paginator
      pageCount={props.pageCount}
      onPageChange={props.onPageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
    />
  </Block>
);

UnitListPagination.propTypes = {
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

UnitListPagination.defaultProps = {
  pageCount: 0,
}

export default UnitListPagination;
