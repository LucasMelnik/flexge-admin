import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  renderExpandableIcon = ({ isExpanded }) => {
    return <Icon name={isExpanded ? 'fa-angle-down' : 'fa-angle-right'} />
  };

  render() {
    return (
      <BootstrapTable
        data={this.props.rows}
        striped
        hover
        search
        expandableRow={() => this.props.expandable}
        expandComponent={this.props.expandableComponent}
        expandColumnOptions={{
          expandColumnVisible: this.props.expandable,
          expandColumnComponent: this.renderExpandableIcon,
          columnWidth: 25
        }}
        selectRow={{
          mode: 'checkbox',
          hideSelectColumn: true,
          clickToSelect: true ,
          onSelect: (row, isSelected, e) => {
            if (this.props.selectable && window.$(e.target).is('td')) {
              this.props.onSelect(row);
            }
            return false;
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
            dataFormat={column.render}
            tdStyle={column.rowColumnStyle}
          >
            {column.label}
          </TableHeaderColumn>
        ))}

      </BootstrapTable>
    );
  }
}
