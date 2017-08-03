import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import './Accordion.css';

export default class AccordionTable extends Component {

  static propTypes = {
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
    header: null,
    children: null,
    onDelete: null,
    onEdit: null,
    selectable: false,
    columns: [],
    rows: [],
    actionComponent: null,
  };

  render() {
    return (
      <div>
        <table
          style={{
            width: '100%',
            borderSpacing: '5px',
          }}
        >
          <thead>
            <tr>
              {this.props.columns.map(column => (
                <th
                  key={`column_${column.path}`}
                  style={{
                    width: column.width,
                    textAlign: 'left',
                  }}
                >
                  {column.label}
                </th>
              ))}
              {this.props.actionComponent && (
                <th
                  style={{
                    paddingLeft: 10,
                    textAlign: 'left',
                  }}
                >
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
                    width: '100%',
                    borderSpacing: '5px',
                  }}
                >
                  <tbody>
                    <tr>
                      {this.props.columns.map(column => (
                        <td
                          key={`row_${row.id || index}_column_${column.path}`}
                          style={{
                            width: column.width,
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
