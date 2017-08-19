import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import StudentListContainer from '../../student/components/StudentListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';

const SchoolClassDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...props.distributorId ? [
          {
            text: 'Distributors',
            link: '/v2/distributors',
          },
          {
            text: props.distributor ? `Distributor - ${props.distributor.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}`,
          },
        ] : [],
        ...(!props.distributorId && !props.companyId) ? [
          {
            text: 'Schools',
            link: '/v2/schools',
          },
        ] : (!props.distributorId) ? [
          {
            text: 'Companies',
            link: '/v2/companies',
          },
        ] : [],
        ...props.companyId ? [
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}`,
          },
        ] : [],
        ...!(props.distributorId && props.companyId) ? [
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/v2/school-detail/${props.schoolId}`,
          },
        ] : [
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/v2/distributor-detail/${props.distributorId}/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
        ],
        {
          text: `Class - ${props.class ? props.class.name : 'loading...'}`,
        },
      ]}
    />
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
