import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import StudentFormContainer from './StudentFormContainer';

const StudentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...(props.distributorId && props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: props.distributor ? `Distributor - ${props.distributor.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}`,
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}/company-detail/${props.companyId}`,
          },
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
          {
            text: props.class ? `Class - ${props.class.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}`,
          },
        ] : (!props.distributorId && props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Companies',
            link: '/companies',
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/company-detail/${props.companyId}`,
          },
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
          {
            text: props.class ? `Class - ${props.class.name}` : 'loading...',
            link: `/company-detail/${props.companyId}/school-detail/${props.schoolId}/class-detail/${props.classId}`,
          },
        ] : (!props.distributorId && !props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Schools',
            link: '/schools',
          },
          {
            text: props.class ? `Class - ${props.class.name}` : 'loading...',
            link: `/school-detail/${props.schoolId}/class-detail/${props.classId}`,
          },
        ] : (!props.distributorId && !props.companyId && !props.schoolId && props.classId) ? [
          {
            text: 'Classes',
            link: '/classes',
          },
          {
            text: props.class ? `Class - ${props.class.name}` : 'loading...',
            link: `/class-detail/${props.classId}`,
          },
        ] : [],
        {
          text: props.studentId ? 'Edit Student' : 'Create Student',
        },
      ]}
    />
    <StudentFormContainer
      studentId={props.studentId}
    />
  </div>
);

StudentFormScene.propTypes = {
  studentId: PropTypes.string,
  schoolId: PropTypes.string,
  classId: PropTypes.string,
  companyId: PropTypes.string,
  distributorId: PropTypes.string,
  distributor: PropTypes.object,
  company: PropTypes.object,
  school: PropTypes.object,
  class: PropTypes.object,
};

StudentFormScene.defaultProps = {
  studentId: null,
  classId: null,
  schoolId: null,
  distributorId: null,
  companyId: null,
  school: null,
  distributor: null,
  company: null,
  class: null,
};

export default StudentFormScene;
