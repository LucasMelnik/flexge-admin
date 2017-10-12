import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

const UnitImagesRecordList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
        },
        {
          label: 'Approved Images Count',
          path: 'imagesCount',
          sort: true,
        },
      ]}
      dataSource={props.units}
    />
    <div
      style={{
        float: 'right',
      }}
    >
      Total approved images: {props.totalApprovedImagesCount}
    </div>
  </div>
);

UnitImagesRecordList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalUnitItems: PropTypes.number.isRequired,
    imagesUnitCount: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  })).isRequired,
  totalApprovedImagesCount: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitImagesRecordList;
