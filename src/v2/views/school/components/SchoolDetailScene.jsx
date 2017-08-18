import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolClassListContainer from '../../school-class/components/SchoolClassListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Card from '../../../core/layout/Card';

const SchoolDetailScene = props => (
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
        ...props.companyId ? [
          {
            text: 'Companies',
            link: '/v2/companies',
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/v2/company-detail/${props.companyId}`,
          },
        ] : [],
        {
          text: `School - ${props.school ? props.school.name : 'loading...'}`,
        },
      ]}
    />
    <div>
      <Separator size="md" />
      <Card
        title="Classes"
      >
        <SchoolClassListContainer
          distributorId={props.distributorId}
          companyId={props.companyId}
          schoolId={props.schoolId}
        />
      </Card>
      <Separator size="md" />
      <ManagerSceneContainer
        title="School Managers"
        endpointUrl={`/schools/${props.schoolId}/managers`}
        initialValues={{
          school: props.schoolId,
        }}
      />
    </div>
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
