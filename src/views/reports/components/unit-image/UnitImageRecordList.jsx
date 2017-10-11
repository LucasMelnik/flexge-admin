import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

const UnitImagesRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Total items',
        path: 'totalUnitItems',
      },
      {
        label: 'Images Unit Count',
        path: 'imagesCount',
      },
    ]}
    dataSource={props.units}
  />
);

UnitImagesRecordList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalUnitItems: PropTypes.number.isRequired,
    imagesUnitCount: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitImagesRecordList;
