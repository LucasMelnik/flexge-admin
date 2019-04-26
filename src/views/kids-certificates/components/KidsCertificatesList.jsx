import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Table from '../../../core/form/Table';

const KidsCertificatesList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Completed at',
        path: 'studentModule.completedAt',
        width: '140px',
        sort: true,
        defaultSortOrder: 'descend',
        render: value => moment(value).format('DD/MM/YYYY HH:mm')
      },
      {
        label: 'Course',
        path: 'studentModule.module.course.name',
        width: '65px',
      },
      {
        label: 'Module',
        path: 'studentModule.module.name',
      },
      {
        label: 'Student',
        path: 'name',
      },
      {
        label: 'Classroom',
        path: 'schoolClass.name',
      },
      {
        label: 'School',
        path: 'schoolClass.school.name',
      },
    ]}
    rows={props.modules}
  />
);

KidsCertificatesList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default KidsCertificatesList;
