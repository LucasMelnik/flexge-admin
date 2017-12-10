import React from 'react';
import PropTypes from 'prop-types';
import SchoolClassReportListContainer from './SchoolClassRecordListContainer';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';

const SchoolClassRecordScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Records',
          link: '/records/filters',
        },
        {
          text: `School - ${props.school.name}`,
        },
      ]}
    />
    <Card
      title="School Classes Record"
      fetching={props.fetching}
    >
      <SchoolClassReportListContainer schoolId={props.schoolId} />
    </Card>
  </div>
);

SchoolClassRecordScene.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  schoolId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};

SchoolClassRecordScene.defaultProps = {
  school: {},
};

export default SchoolClassRecordScene;
