import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import StudentListContainer from './StudentListContainer';
import StudentListFilterContainer from './StudentListFilterContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const StudentDetailScene = props => (
  <div>
    <Card
      title="Students"
      actions={
        (
          <Button
            icon="fa-plus"
            label="New Student"
            type="default"
            onClick={() => props.distributorId && props.companyId ?
              browserHistory.push(`/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}/students/new`) :
            !props.distributorId && props.companyId ?
              browserHistory.push(`/v2/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}/students/new`) :
            !props.distributorId && !props.companyId && props.schoolId ?
              browserHistory.push(`/v2/school-detail/${props.schoolId}/class-detail/${props.classId}/students/new`) :
            !props.distributorId && !props.companyId && !props.schoolId && props.classId ?
              browserHistory.push(`/v2/class-detail/${props.classId}/students/new`) :
              browserHistory.push(`/v2/students/new`)
          }
          />
        )
      }
    >
      <StudentListFilterContainer companyId={props.companyId} />
      <StudentListContainer
        distributorId={props.distributorId}
        companyId={props.companyId}
        schoolId={props.schoolId}
        classId={props.classId}
      />
    </Card>


  </div>
);

StudentDetailScene.propTypes = {
  companyId: PropTypes.string,
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string,
  distributorId: PropTypes.string,
};

StudentDetailScene.defaultProps = {
  companyId: null,
  classId: null,
  school: null,
  distributorId: null,
};

export default StudentDetailScene;
