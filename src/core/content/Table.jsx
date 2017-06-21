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
    onEdit: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    actionComponent: null,
    actionComponentWidth: null,
    onSelect: null,
    onDelete: null,
    onEdit: null,
    onSendReview: null,
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
            {(this.props.onDelete || this.props.onEdit || this.props.onSendReview) && (
              <TableHeaderColumn
                style={{ width: 110 }}
              >
                Actions
              </TableHeaderColumn>
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
              {(this.props.onDelete || this.props.onEdit) && (
                <TableRowColumn
                  style={{ width: 110 }}
                >
                  {this.props.onEdit && (
                    <IconButton
                      style={{ width: 45 }}
                      onClick={() => this.props.onEdit(row, index)}
                      iconClassName="material-icons"
                    >
                      edit
                    </IconButton>
                  )}
                  {this.props.onDelete && (
                    <IconButton
                      style={{ width: 45 }}
                      onClick={() => this.props.onDelete(row, index)}
                      iconClassName="material-icons"
                    >
                      delete
                    </IconButton>
                  )}
                </TableRowColumn>
              )}
              {this.props.onSendReview && (
                <TableRowColumn
                  style={{ width: 90 }}
                >
                  <IconButton
                    onClick={() => this.props.onSendReview(row, index)}
                    iconClassName="material-icons"
                  >
                    send
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
