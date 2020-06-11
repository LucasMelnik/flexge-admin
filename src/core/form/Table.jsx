import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { Table as AntTable } from 'antd';

export default class Table extends React.Component {

  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pagination: PropTypes.shape({
      current: PropTypes.number,
      total: PropTypes.number,
      pageSize: PropTypes.number,
    }),
    selectedRows: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    onSelectRows: PropTypes.func,
    fetching: PropTypes.bool,
    selectable: PropTypes.bool,
    expandableComponent: PropTypes.func,
    filteredValue: PropTypes.string,
    sortOrder: PropTypes.string,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    bordered: PropTypes.bool,
    showTableCount: PropTypes.bool,
    indentSize: PropTypes.number,
    locale: PropTypes.shape({
      filterConfirm: PropTypes.string,
      filterReset: PropTypes.string,
      emptyText: PropTypes.string,
    }),
    scroll: PropTypes.shape({
      x: PropTypes.number,
    }),
  };

  static defaultProps = {
    onSelect: null,
    onChange: null,
    onSelectRows: null,
    fetching: false,
    pagination: null,
    selectedRows: null,
    selectable: false,
    expandableComponent: null,
    filteredValue: null,
    sortOrder: null,
    bordered: true,
    showTableCount: true,
    indentSize: 10,
    rowKey: 'id',
    locale: {},
    scroll: {},
  };

  sort = (a, b, path) => {
    if (isString(get(a, path, ''))) {
      return get(a, path, '').localeCompare(get(b, path, ''));
    }
    return a[path] - b[path];
  };
  
  render() {
    return (
      <div>
        <AntTable
          pagination={(this.props.pagination && {
            showTotal: total => `Total ${total} items`,
            ...this.props.pagination,
          }) || false}
          rowKey={this.props.rowKey}
          rowSelection={this.props.onSelectRows && {
            hideDefaultSelections: true,
            selectedRowKeys: this.props.selectedRows,
            onChange: this.props.onSelectRows,
          }}
          bordered={this.props.bordered}
          indentSize={this.props.indentSize}
          locale={{
            filterConfirm: 'Ok',
            filterReset: 'Reset',
            emptyText: 'No Data',
            ...this.props.locale,
          }}
          dataSource={this.props.rows}
          columns={this.props.columns.map(column => ({
            ...column,
            title: column.label,
            width: column.width,
            dataIndex: column.path,
            render: column.render,
            sorter: column.sort ? (a, b) => this.sort(a, b, column.path) : null,
            defaultSortOrder: column.defaultSortOrder,
            className: `${column.className || ''} ${this.props.selectable ? 'selectable-table' : ''}`,
            onCellClick: this.props.selectable && column.path !== 'action' ? row => this.props.onSelect(row) : null,
            align: column.align,
          }))}
          onChange={this.props.onChange}
          loading={this.props.fetching}
          expandedRowRender={this.props.expandableComponent}
          filteredValue={this.props.filteredValue}
          sortOrder={this.props.sortOrder}
          size="small"
          scroll={this.props.scroll}
        />
        {(!this.props.pagination && this.props.showTableCount) && (
          <small>{this.props.rows.length} registers found.</small>
        )}
      </div>
    );
  } 
}
