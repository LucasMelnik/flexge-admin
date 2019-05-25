import React from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import head from 'lodash/head';
import startCase from 'lodash/startCase';
import orderBy from 'lodash/orderBy';
import ReactTable from "react-table";
import "react-table/react-table.css";

const DataImportResultList = props => props.data.length ? (
  <ReactTable
    defaultPageSize={50}
    data={orderBy(props.data, ['errors.length'], 'desc')}
    columns={keys(omit(head(props.data), ['hidden'])).map(key => ({
      Header: startCase(key),
      accessor: key,
    }))}
  />
) : (
  <p>
    No data to show.
  </p>
);

DataImportResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DataImportResultList;
