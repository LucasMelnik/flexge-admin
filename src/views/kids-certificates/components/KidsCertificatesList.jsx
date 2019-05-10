import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

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
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        render: (cell, row) => (
          <div>
            <Button
              icon="file-pdf"
              onClick={() => props.onDownload(row.studentModule)}
            />
          </div>
        ),
      },
    ]}
    rows={props.modules}
  />
);

KidsCertificatesList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onDownload: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default KidsCertificatesList;
