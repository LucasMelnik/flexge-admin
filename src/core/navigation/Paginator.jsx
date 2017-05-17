import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import './Paginator.css';

const Paginator = props => (
  <ReactPaginate
    pageCount={props.pageCount}
    pageRangeDisplayed={props.pageRangeDisplayed}
    marginPagesDisplayed={props.marginPagesDisplayed}
    onPageChange={props.onPageChange}
    containerClassName="paginator-container"
    activeClassName="paginator-active-page"
    pageClassName="paginator-page"
    previousClassName="paginator-controls"
    nextClassName="paginator-controls"
    previousLabel={<i className="material-icons">chevron_left</i>}
    nextLabel={<i className="material-icons">chevron_right</i>}
  />
);

Paginator.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  marginPagesDisplayed: PropTypes.number,
};

Paginator.defaultProps = {
  marginPagesDisplayed: 3,
};

export default Paginator;
