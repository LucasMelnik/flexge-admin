import React from 'react';
import PropTypes from 'prop-types';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import head from 'lodash/head';
import startCase from 'lodash/startCase';
import Table from '../../../core/form/Table';
import Card from '../../../core/layout/Card';

const DataImportResultList = props => (
  <Card>
    {props.data.length ? (
      <Table
        rowKey={row => row.name}
        rows={props.data}
        columns={keys(omit(head(props.data), ['errors', 'children', 'hidden'])).map(key => ({
          label: startCase(key),
          path: key,
          render: (value, row) => ({
            children: value,
            props: {
              style: {
                backgroundColor: row.children ? 'rgba(238,49,57,0.6)' : '#fff',
              },
            },
          }),
        }))}
      />
    ) : (
      <p>
        No data to show.
      </p>
    )}
  </Card>
);

DataImportResultList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

export default DataImportResultList;
