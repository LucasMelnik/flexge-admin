import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Paginator from '../../../core/navigation/Paginator';

const ModuleListPagination = props => (
  <Block
    textAlign="center"
  >
    <Paginator
      pageCount={props.pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      onPageChange={props.onPageChange}
    />
  </Block>
);

ModuleListPagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ModuleListPagination;
