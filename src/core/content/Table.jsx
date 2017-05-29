import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import {
  Table as MaterialTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import './Table.css';

export default class Table extends Component {
  static propTypes = {
    selectable: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequried,
    })),
    actionComponent: PropTypes.func,
    onSelect: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    actionComponent: null,
    onSelect: null,
    selectable: false,
    columns: [],
    rows: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      currentSortColumn: '',
      currentSortDirection: '',
    };
  }

  handleSortColumn = (path) => {
    if (this.state.currentSortColumn === path) {
      this.setState({ currentSortDirection: this.state.currentSortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      this.setState({
        currentSortColumn: path,
        currentSortDirection: 'desc',
      });
    }
  }

  render() {
    return (
      <MaterialTable className={`table ${this.props.selectable ? 'selectable' : ''}`}
        selectable={this.props.selectable}
        onRowSelection={row => this.props.onSelect && this.props.onSelect(row)}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {this.props.actionComponent && <TableHeaderColumn className="action-column" />}
            {this.props.columns.map(column => (
              <TableHeaderColumn
                key={column.label}
                className={`
                  ${column.path === this.state.currentSortColumn && this.state.currentSortDirection === 'asc' && 'asc'}
                  ${column.path === this.state.currentSortColumn && this.state.currentSortDirection === 'desc' && 'desc'}
                `}
              >
                {column.label}
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {this.props.rows && this.props.rows.length > 0 ? this.props.rows.map(row => (
            <TableRow key={row.id}>
              {this.props.actionComponent && (
                <TableRowColumn className="action-column">
                  {this.props.actionComponent(row)}
                </TableRowColumn>
              )}
              {this.props.columns.map(column => (
                <TableRowColumn
                  key={column.path}
                >
                  {get(row, column.path, '').toString()}
                </TableRowColumn>
              ))}
            </TableRow>
          )) : (
            <TableRow>
              <TableRowColumn>
                No data available.
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </MaterialTable>
    );
  }
}
