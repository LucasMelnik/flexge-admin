import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const Table = props => (
  <table className="table table-striped dt-responsive display">
    <thead>
      <tr>
        {props.columns.map(column => (
          <th
            key={`column_${column.path}`}
          >
            {column.label}
          </th>
        ))}
        {props.actionComponent && (
          <th>
            Actions
          </th>
        )}
      </tr>
    </thead>
    <tbody>
      {props.rows.map((row, index) => (
        <tr>
          {props.columns.map(column => (
            <td
              key={`row_${row.id || index}_column_${column.path}`}
              style={{
                ...column.rowColumnStyle,
              }}
            >
              {column.render ? column.render(row) : get(row, column.path, '')}
            </td>
          ))}
          {props.actionComponent && (
            <td>
              {props.actionComponent(row, index)}
            </td>
          )}
        </tr>
      ))}
    </tbody>

  </table>
);

Table.propTypes = {
  type: PropTypes.oneOf(['bordered', 'striped']),
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

Table.defaultProps = {
  type: 'bordered',
  columns: [],
  rows: [],
  actionComponent: null,
};

export default Table;
