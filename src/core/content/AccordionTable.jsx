import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import IconButton from 'material-ui/IconButton';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import './Accordion.css';

export default class Accordion extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string,
      rowColumnStyle: PropTypes.object,
    })),
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    rows: PropTypes.arrayOf(PropTypes.object),
    renderFunction: PropTypes.func,
  };

  static defaultProps = {
    header: null,
    children: null,
    onDelete: null,
    onEdit: null,
    selectable: false,
    columns: [],
    rows: [],
    renderFunction: null,
  };

  render() {
    return (
      <div>
        <table
          style={{
            borderSpacing: '5px',
          }}
        >
          <thead>
            <tr>
              {this.props.columns.map(column => (
                <th
                  key={`column_${column.path}`}
                  style={{
                    width: column.width || 'auto',
                    textAlign: 'left',
                  }}
                >
                  {column.label}
                </th>))}
                {(this.props.onDelete || this.props.onEdit) && (
                  <th>
                    Actions
                  </th>
                )}
            </tr>
          </thead>
        </table>
        {this.props.rows.map((row, index) => (
          <Collapse
            key={row.id || index}
          >
            <Panel
              header={(
                <table
                  style={{
                    borderSpacing: '5px',
                  }}
                >
                  <tbody>
                    <tr>
                      {this.props.columns.map(column => (
                        <td
                          key={`row_${row.id || index}_column_${column.path}`}
                          style={{
                            width: column.width || 'auto',
                            ...column.rowColumnStyle,
                          }}
                        >
                          {get(row, column.path, '')}
                        </td>),
                      )}
                      {(this.props.onDelete) && (
                        <td>
                          <IconButton
                            style={{ width: 45 }}
                            onClick={() => this.props.onDelete(row, index)}
                            iconClassName="material-icons"
                          >
                            delete
                          </IconButton>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              )}
              headerClass="accordion-header"
            >
              {this.props.renderFunction(row)}
            </Panel>
          </Collapse>
        ),
        )}
      </div>
    );
  }
}
