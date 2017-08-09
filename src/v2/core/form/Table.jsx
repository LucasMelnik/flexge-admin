import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import $ from 'jquery';
import 'datatables.net';

export default class Table extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hasSortColumn: PropTypes.bool,
    hasInfo: PropTypes.bool,
    noRecordsText: PropTypes.string,
    infoEmptyText: PropTypes.string,
    infoText: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      rowColumnStyle: PropTypes.object,
      render: PropTypes.func,
    })),
    actionComponent: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
    renderFunction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    columns: [],
    rows: [],
    hasSortColumn: true,
    noRecordsText: 'No records found.',
    hasInfo: true,
    infoText: '_MAX_ records found.',
    infoEmptyText: 'No records found.',
    actionComponent: null,
  };

  componentDidMount() {
    $(this.table).DataTable({
      responsive: true,
      bPaginate: false,
      searching: false,
      bDestroy: true,
      bSort: this.props.hasSortColumn,
      bInfo: this.props.hasInfo,
      language: {
        zeroRecords: this.props.noRecordsText,
        info: this.props.infoText,
        infoEmpty: this.props.infoEmptyText,
      },
    });
  }

  render() {
    return (
      <table ref={table => this.table = table} className="table table-striped dt-responsive display">
        <thead>
          <tr>
            {this.props.columns.map(column => (
              <th
                key={`column_${column.path}`}
              >
                {column.label}
              </th>
            ))}
            {this.props.actionComponent && (
              <th>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.rows.map((row, index) => (
            <tr key={`row-${row.id}`}>
              {this.props.columns.map(column => (
                <td
                  key={`row_${row.id || index}_column_${column.path}`}
                  style={{
                    ...column.rowColumnStyle,
                  }}
                >
                  {column.render ? column.render(row) : get(row, column.path, '')}
                </td>
              ))}
              {this.props.actionComponent && (
                <td>
                  {this.props.actionComponent(row, index)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
