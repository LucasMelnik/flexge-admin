import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy'
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
      path: PropTypes.string,
      labelWhenNull: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      render: PropTypes.func,
      rowColumnStyle: PropTypes.object,
    })),
    actionComponent: PropTypes.func,
    actionComponentWidth: PropTypes.number,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    allowActionValidator: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
    onSend: PropTypes.func,
    isReadOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  }

  static defaultProps = {
    actionComponent: null,
    actionComponentWidth: null,
    onSelect: null,
    onDelete: null,
    onEdit: null,
    allowActionValidator: () => true,
    selectable: false,
    columns: [],
    rows: [],
    onSend: null,
    onSendReview: null,
    isReadOnly: false,
  }

  state = { data: [], highlightColumn: '', sortColumn: '', direction: 'desc' }

  componentWillMount() {
    this.setState({
      data: this.props.rows,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.rows,
    });
  }

  handleSort = (path) => {
    let direction = null;
    if (this.state.sortColumn === path) {
      direction = this.state.direction === 'asc' ? 'desc' : 'asc';
    } else {
      direction = 'desc';
    }
    this.setState({
      direction,
      sortColumn: path,
      data: orderBy(this.state.data, row => get(row, path) || '', direction),
    });
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
                onTouchTap={() => this.handleSort(column.path)}
                style={{
                  width: column.width || 'auto',
                }}
              >
                {column.label}
                <i className="material-icons" style={{ verticalAlign: 'middle' }}>
                  {this.state.sortColumn === column.path && this.state.direction === 'desc' && (
                    'keyboard_arrow_down'
                  )}
                  {this.state.sortColumn === column.path && this.state.direction === 'asc' && (
                    'keyboard_arrow_up'
                  )}
                </i>
              </TableHeaderColumn>
            ))}
            <TableHeaderColumn
              style={{ width: 110 }}
            >
              {(this.props.onDelete || this.props.onEdit || this.props.onSend) && 'Actions'}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {this.state.data && this.state.data.length > 0 ? this.state.data.map((row, index) => (
            <TableRow
              style={index % 2 === 0 ? { background: '#f7f7f7' } : { background: '#ffffff' }}
              key={row.id || index}
            >
              {this.props.actionComponent && (
                <TableRowColumn style={{ width: this.props.actionComponentWidth || 'auto' }}>
                  {this.props.actionComponent(row)}
                </TableRowColumn>
              )}
              {this.props.columns.map((column) => {
                let content = null;
                if (column.render) {
                  content = column.render(row);
                } else if (isBoolean(get(row, column.path))) {
                  content = get(row, column.path) ? 'Yes' : 'No';
                } else {
                  if (row[column.path] === null) {
                    content = column.labelWhenNull || '';
                  } else {
                    content = get(row, column.path, column.labelWhenNull || '').toString();
                  }
                }
                return (
                  <TableRowColumn
                    key={`row-${index}-${column.path}`}
                    onMouseDown={() => this.props.onSelect && this.props.onSelect(row, index)}
                    style={{
                      width: column.width || 'auto',
                      ...column.rowColumnStyle,
                    }}
                  >
                    <div
                      style={{
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                        textAlign: 'justify',
                      }}
                    >
                      {content}
                    </div>
                  </TableRowColumn>
                )
              })}
              <TableRowColumn
                style={{ width: 110 }}
              >
                {(this.props.allowActionValidator(row) && this.props.onEdit) && (
                  <IconButton
                    style={{ width: 45 }}
                    onClick={() => this.props.onEdit(row, index)}
                    iconClassName="material-icons"
                  >
                    edit
                  </IconButton>
                )}
                {(this.props.allowActionValidator(row) && this.props.onDelete) && (
                  <IconButton
                    style={{ width: 45 }}
                    onClick={() => this.props.onDelete(row, index)}
                    iconClassName="material-icons"
                  >
                    delete
                  </IconButton>
                )}
                {this.props.allowActionValidator(row) && this.props.onSend && (
                  <IconButton
                    onClick={() => this.props.onSend(row, index)}
                    iconClassName="material-icons"
                  >
                    rate_review
                  </IconButton>
                )}
              </TableRowColumn>
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
