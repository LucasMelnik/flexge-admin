import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const ItemByWordsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Course',
        path: 'name',
        width: '5%',
      },
      {
        label: 'Module',
        path: 'module.name',
        sort: true,
        width: '10%',
      },
      {
        label: 'Unit',
        path: 'module.unit.name',
        sort: true,
        width: '10%',
      },
      {
        label: 'Text',
        path: 'module.unit.unititems.item.text',
        width: '25%',
      },
    ]}
    rows={props.items}
    selectable
    onSelect={row => window.open(`/modules/${row.module.id}/units/${row.module.unit.id}/items/`, '_blank')}
  />
);

ItemByWordsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    unit: PropTypes.PropTypes.shape({}).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ItemByWordsList;
