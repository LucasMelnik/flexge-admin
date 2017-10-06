import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { Table as AntTable } from 'antd';

const sort = (a, b, path) => {
  if (isString(get(a, path, ''))) {
    return get(a, path, '').localeCompare(get(b, path, ''));
  }
  return a[path] - b[path];
};

const Table = props => (
  <AntTable
    pagination={false}
    size="middle"
    rowKey="id"
    bordered
    locale={{
      filterConfirm: 'Ok',
      filterReset: 'Reset',
      emptyText: 'No Data',
    }}
    dataSource={props.dataSource}
    columns={props.columns.map(column => ({
      title: column.label,
      dataIndex: column.path,
      sorter: column.sort ? (a, b) => sort(a, b, column.path) : null,
    }))}
    onRowClick={props.onSelect}
    loading={props.fetching}
    expandedRowRender={props.expandableComponent}
  />
);

Table.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func,
  fetching: PropTypes.bool,
  expandableComponent: PropTypes.func,
};

Table.defaultProps = {
  onSelect: null,
  fetching: false,
  expandableComponent: null,
};

export default Table;
