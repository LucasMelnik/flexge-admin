import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../core/content/Table';

const TeacherList = () => (
  <Table
    columns={[
      {
        label: 'Name',
        path: 'name',
      },
    ]}
    rows={[
      {
        name: '1A',
      },
      {
        name: '1B',
      },
      {
        name: '1C',
      },
    ]}
    selectable
  />
);

TeacherList.propTypes = {
  fetching: PropTypes.bool.isRequired,
};

export default TeacherList;
