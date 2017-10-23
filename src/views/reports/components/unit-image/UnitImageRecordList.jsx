import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';
import UnitImageListFilterContainer from './UnitImageListFilterContainer';
import Separator from '../../../../core/layout/Separator';

const UnitImagesRecordList = props => (
  <div>
    <UnitImageListFilterContainer />
    <Separator />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Course',
          path: 'course.name',
          sort: true,
          render: (cell, row) => {
            if (row.course) {
              return row.course.name;
            }
            return '-';
          },
        },
        {
          label: 'Module',
          path: 'module.name',
          sort: true,
          render: (cell, row) => {
            if (row.module) {
              return row.module.name;
            }
            return '-';
          },
        },
        {
          label: 'Name',
          path: 'name',
          sort: true,
        },
        {
          label: 'Image Owner',
          path: 'imageowner.name',
          sort: true,
          render: (cell, row) => {
            if (row.imageowner && row.imageowner.name) {
              return row.imageowner.name;
            } else if (row.imageowner && row.imageowner.email) {
              return row.imageowner.email;
            }
          },
        },
        {
          label: 'Approved Images Count (Presentation)',
          path: 'imagesPresentationCount',
          sort: true,
        },
        {
          label: 'Approved Images Count (Single Choice Image)',
          path: 'imagesSingleChoiceImageCount',
          sort: true,
        },
        {
          label: 'Total Approved Images Count',
          path: 'imagesCount',
          sort: true,
        },
      ]}
      dataSource={props.units}
    />
    <div
      style={{
        float: 'right',
        fontSize: 14,
        margin: 10,
      }}
    >
      <div
        style={{
          marginRight: 10,
        }}
      >
        Total presentation images: {props.totalImagesPresentationCount}
      </div>
      <div
        style={{
          marginRight: 10,
        }}
      >
        Total single choice images: {props.totalImagesSingleChoiceCount}
      </div>
      <div>
        Total images: {props.totalApprovedImagesCount}
      </div>
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
  totalImagesPresentationCount: PropTypes.number.isRequired,
  totalImagesSingleChoiceCount: PropTypes.number.isRequired,
  totalApprovedImagesCount: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitImagesRecordList;
