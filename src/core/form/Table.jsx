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
  <div>
    <AntTable
      pagination={(props.pagination && {
        showTotal: total => `Total ${total} items`,
        ...props.pagination,
      }) || false}
      rowKey={props.rowKey}
      bordered={props.bordered}
      indentSize={props.indentSize}
      locale={{
        filterConfirm: 'Ok',
        filterReset: 'Reset',
        emptyText: 'No Data',
        ...props.locale,
      }}
      dataSource={props.rows}
      columns={props.columns.map(column => ({
        title: column.label,
        width: column.width,
        dataIndex: column.path,
        render: column.render,
        sorter: column.sort ? (a, b) => sort(a, b, column.path) : null,
        defaultSortOrder: column.defaultSortOrder,
        className: column.className,
        onCellClick: props.selectable && column.path !== 'action' ? row => props.onSelect(row) : null,
        align: column.align,
      }))}
      onChange={props.onChange}
      loading={props.fetching}
      expandedRowRender={props.expandableComponent}
      filteredValue={props.filteredValue}
      sortOrder={props.sortOrder}
      size="small"
    />
    {(!props.pagination && props.showTableCount) && (
      <small>{props.rows.length} registers found.</small>
    )}
  </div>
);

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  fetching: PropTypes.bool,
  selectable: PropTypes.bool,
  expandableComponent: PropTypes.func,
  filteredValue: PropTypes.string,
  sortOrder: PropTypes.string,
  rowKey: PropTypes.string,
  bordered: PropTypes.bool,
  showTableCount: PropTypes.bool,
  indentSize: PropTypes.number,
  locale: PropTypes.shape({
    filterConfirm: PropTypes.string,
    filterReset: PropTypes.string,
    emptyText: PropTypes.string,
  }),
};

Table.defaultProps = {
  onSelect: null,
  onChange: null,
  fetching: false,
  pagination: null,
  selectable: false,
  expandableComponent: null,
  filteredValue: null,
  sortOrder: null,
  bordered: true,
  showTableCount: true,
  indentSize: 10,
  rowKey: 'id',
  locale: {},
};

export default Table;
