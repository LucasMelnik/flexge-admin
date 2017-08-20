import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import StudentListContainer from './StudentListContainer';
import StudentListFilterContainer from './StudentListFilterContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolClassDetailScene = props => (
  <div>
    <Card
      title="Students"
      actions={
        (
          <Button
            icon="fa-plus"
            label="New Student"
            type="default"
            onClick={() => browserHistory.push(`/v2/students/new`)}
          />
        )
      }
    >
      <StudentListFilterContainer />
      <StudentListContainer
        distributorId={props.distributorId}
        companyId={props.companyId}
        schoolId={props.schoolId}
        classId={props.classId}
      />
    </Card>


  </div>
);

SchoolClassDetailScene.propTypes = {
  companyId: PropTypes.string,
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string,
  distributorId: PropTypes.string,
};

SchoolClassDetailScene.defaultProps = {
  companyId: null,
  classId: null,
  school: null,
  distributorId: null,
};

export default SchoolClassDetailScene;
