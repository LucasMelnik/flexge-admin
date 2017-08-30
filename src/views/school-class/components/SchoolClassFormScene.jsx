import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolClassFormContainer from './SchoolClassFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolClassFormScene = props => (
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
        ] : [
          {
            text: 'Schools',
            link: '/schools',
          },
          {
            text: props.school ? `School - ${props.school.name}` : 'loading...',
            link: `/company-detail/${props.companyId}/school-detail/${props.schoolId}`,
          },
        ],
        {
          text: `${props.classId ? 'Update Class' : 'Create Class'}`,
        },
      ]}
    />
    <Card
      title={props.classId ? 'Update Class' : 'Create Class'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <SchoolClassFormContainer
        schoolId={props.schoolId}
        classId={props.classId}
      />
    </Card>
  </div>
);

SchoolClassFormScene.propTypes = {
  companyId: PropTypes.string,
  distributorId: PropTypes.string,
  schoolId: PropTypes.string,
  classId: PropTypes.string,
  company: PropTypes.object,
  distributor: PropTypes.object,
  school: PropTypes.object,
};

SchoolClassFormScene.defaultProps = {
  companyId: null,
  distributorId: null,
  schoolId: null,
  classId: null,
  company: null,
  distributor: null,
  school: null,
};

export default SchoolClassFormScene;
