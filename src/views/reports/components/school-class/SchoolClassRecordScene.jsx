import React from 'react';
import PropTypes from 'prop-types';
import SchoolClassReportListContainer from './SchoolClassRecordListContainer';
import Card from '../../../../core/layout/Card';

const SchoolClassRecordScene = props => (
  <div>
    <Card
      title="School Classes Record"
    >
      <SchoolClassReportListContainer schoolId={props.params.schoolId} />
    </Card>
  </div>
);

SchoolClassRecordScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
  }).isRequired,
};

export default SchoolClassRecordScene;
