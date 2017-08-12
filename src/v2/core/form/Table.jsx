import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Icon from '../layout/Icon';

export default class Table extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      isKey: PropTypes.bool,
      hidden: PropTypes.bool,
      render: PropTypes.func,
      width: PropTypes.string,
      rowColumnStyle: PropTypes.object,
    })),
    rows: PropTypes.arrayOf(PropTypes.object),
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    expandable: PropTypes.bool,
    expandableComponent: PropTypes.func,
  };

  static defaultProps = {
    columns: [],
    rows: [],
    expandable: false,
    selectable: false,
    onSelect: null,
  };

  state = { expandedRows: [] };

  renderColumnValue = (cell, row, path) => {
    return get(row, path, '');
  };

  renderExpandableIcon = ({ isExpanded }) => {
    return <Icon name={isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} />
  };

  render() {
    return (
      <div>
        <BootstrapTable
          data={this.props.rows}
          striped
          hover
          search={false}
          options={{
            expandBy: 'column',
          }}
          expandableRow={() => this.props.expandable}
          expandComponent={row => {
            if (this.state.expandedRows.find(id => id === row.id)) {
              return this.props.expandableComponent(row)
            } else {
              return null;
            }
          }}
          expandColumnOptions={{
            expandColumnVisible: this.props.expandable,
            expandColumnComponent: this.renderExpandableIcon,
            columnWidth: 40
          }}
          selectRow={{
            mode: 'checkbox',
            hideSelectColumn: true,
            clickToSelect: true,
            clickToExpand: true,
            onSelect: (row, isSelected, e) => {
              this.setState({
                expandedRows: [
                  ...this.state.expandedRows,
                  row.id
                ],
              });

              if (window.$(e.target).is('button') || window.$(e.target).is('i')) {
                return false;
              }
              if (this.props.selectable && this.props.onSelect) {
                this.props.onSelect(row);
              }
            },
          }}
        >
          {this.props.columns.map(column => (
            <TableHeaderColumn
              key={`column-definition-${column.label}`}
              isKey={column.isKey}
              hidden={column.hidden}
              dataField={column.path}
              dataSort={column.path !== 'action'}
              dataFormat={column.render || this.renderColumnValue}
              formatExtraData={column.path}
              tdStyle={column.rowColumnStyle}
              width={column.width || 'auto'}
              expandable={false}
            >
              {column.label}
            </TableHeaderColumn>
          ))}
        </BootstrapTable>
        <small>{this.props.rows.length} record{this.props.rows.length > 1 && 's'} found.</small>
      </div>
    );
  }
}
