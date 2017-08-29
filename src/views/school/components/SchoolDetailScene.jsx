import React from 'react';
import PropTypes from 'prop-types';
import SchoolClassListContainer from '../../school-class/components/SchoolClassListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const SchoolDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...(!props.distributorId && !props.companyId) ? [
          {
            text: 'Schools',
            link: '/schools',
          },
        ] : props.distributorId ? [
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
        ] : !props.distributorId && props.companyId ? [
          {
            text: 'Companies',
            link: '/companies',
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/company-detail/${props.companyId}`,
          },
        ] : [],
        {
          text: `School - ${props.school ? props.school.name : 'loading...'}`,
        },
      ]}
    />
    <Card
      title="Classes"
    >
      <SchoolClassListContainer
        distributorId={props.distributorId}
        companyId={props.companyId}
        schoolId={props.schoolId}
      />
    </Card>
  </div>
);

SchoolDetailScene.propTypes = {
  companyId: PropTypes.string,
  schoolId: PropTypes.string.isRequired,
  company: PropTypes.object,
  school: PropTypes.object,
  distributor: PropTypes.object,
  distributorId: PropTypes.string,
};

SchoolDetailScene.defaultProps = {
  companyId: null,
  school: null,
  distributor: null,
  distributorId: null,
};

export default SchoolDetailScene;
