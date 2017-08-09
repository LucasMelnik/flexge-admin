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
    actionComponent: PropTypes.func,
  };

  static defaultProps = {
    columns: [],
    rows: [],
    actionComponent: null,
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
        options={{
          onRowClick: this.props.selectable ? this.props.onSelect : null,
        }}
      >
        {this.props.columns.map(column => (
          <TableHeaderColumn
            key={`colum-definition-${column.label}`}
            isKey={column.isKey}
            hidden={column.hidden}
            dataField={column.path}
            dataSort
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
