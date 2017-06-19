import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import {
  Table as MaterialTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import './Table.css';

export default class Table extends Component {

  static propTypes = {
    selectable: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      labelWhenNull: PropTypes.string,
      width: PropTypes.number,
    })),
    actionComponent: PropTypes.func,
    actionComponentWidth: PropTypes.number,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    actionComponent: null,
    actionComponentWidth: null,
    onSelect: null,
    onDelete: null,
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
      <MaterialTable
        className={`table ${this.props.selectable ? 'selectable' : ''}`}
        selectable={this.props.selectable}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {this.props.actionComponent && <TableHeaderColumn style={{ width: this.props.actionComponentWidth || 'auto' }} />}
            {this.props.columns.map(column => (
              <TableHeaderColumn
                key={column.label}
                className={`
                  ${column.path === this.state.currentSortColumn && this.state.currentSortDirection === 'asc' && 'asc'}
                  ${column.path === this.state.currentSortColumn && this.state.currentSortDirection === 'desc' && 'desc'}
                `}
                style={{
                  width: column.width || 'auto',
                }}
              >
                {column.label}
              </TableHeaderColumn>
            ))}
            {this.props.onDelete && (
              <TableHeaderColumn
                key="delete"
                style={{ width: 90 }}
              />
            )}
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {this.props.rows && this.props.rows.length > 0 ? this.props.rows.map((row, index)=> (
            <TableRow
              key={row.id || index}
            >
              {this.props.actionComponent && (
                <TableRowColumn style={{ width: this.props.actionComponentWidth || 'auto' }}>
                  {this.props.actionComponent(row)}
                </TableRowColumn>
              )}
              {this.props.columns.map(column => (
                <TableRowColumn
                  key={column.path}
                  onMouseDown={() => this.props.onSelect && this.props.onSelect(row, index)}
                  style={{
                    width: column.width || 'auto',
                  }}
                >
                  {isBoolean(row[column.path]) && (row[column.path] ? 'Yes' : 'No')}
                  {!isBoolean(row[column.path]) && get(row, column.path, column.labelWhenNull || '').toString()}
                </TableRowColumn>
              ))}
              {this.props.onDelete && (
                <TableRowColumn
                  key={`delete${row.id || index}`}
                  style={{ width: 90 }}
                >
                  <IconButton
                    onClick={() => this.props.onDelete(row, index)}
                    iconClassName="material-icons"
                  >
                    delete
                  </IconButton>
                </TableRowColumn>
              )}
              {this.props.onSendReview && (
                <TableRowColumn
                  key={`send{row.id || index}`}
                  style={{ width: 90 }}
                >
                  <IconButton
                    onClick={() => this.props.onSendReview(row, index)}
                    iconClassName="material-icons"
                  >
                    paper
                  </IconButton>
                </TableRowColumn>
              )}
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
