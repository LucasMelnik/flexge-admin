import React from 'react';
import PropTypes from 'prop-types';
import StudentDetailSceneContainer from '../../student/components/StudentDetailSceneContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const SchoolClassDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...(props.distributorId) ? [
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
        ] : (props.companyId) ? [
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
        ] : (props.schoolId) ? [
          {
            text: 'Schools',
            link: '/schools',
          },
          {
            text: `Class - ${props.class ? props.class.name : 'loading...'}`,
          },
        ] : (props.classId) ? [
          {
            text: 'Classes',
            link: '/classes',
          },
        ] : [],
        {
          text: `Class - ${props.class ? props.class.name : 'loading...'}`,
        },
      ]}
    />

    <StudentDetailSceneContainer
      distributorId={props.distributorId}
      companyId={props.companyId}
      schoolId={props.schoolId}
      classId={props.classId}
    />
  </div>
);

SchoolClassDetailScene.propTypes = {
  companyId: PropTypes.string,
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string,
  company: PropTypes.object,
  class: PropTypes.object,
  school: PropTypes.object,
  distributor: PropTypes.object,
  distributorId: PropTypes.string,
};

SchoolClassDetailScene.defaultProps = {
  companyId: null,
  school: null,
  distributor: null,
  distributorId: null,
};

export default SchoolClassDetailScene;