import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import StudentDetailSceneContainer from '../../student/components/StudentDetailSceneContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';

const SchoolClassDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...(props.distributorId && props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Distributors',
            link: '/v2/distributors',
          },
          {
            text: props.distributor ? `Distributor - ${props.distributor.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}`,
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}`,
          },
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
        ] : (!props.distributorId && props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Companies',
            link: '/v2/companies',
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/v2/company-detail/${props.companyId}`,
          },
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/v2/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
        ] : (!props.distributorId && !props.companyId && props.schoolId && props.classId) ? [
          {
            text: 'Schools',
            link: '/v2/schools',
          },
          {
            text: `Class - ${props.class ? props.class.name : 'loading...'}`,
          },
        ] : (!props.distributorId && !props.companyId && !props.schoolId && props.classId) ? [
          {
            text: 'Classes',
            link: '/v2/classes',
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
