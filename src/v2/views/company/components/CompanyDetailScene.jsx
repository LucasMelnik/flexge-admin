import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Separator from '../../../core/layout/Separator';
import SchoolListContainer from '../../school/components/SchoolListContainer';

const CompanyDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...props.distributorId ? [
          {
            text: 'Distributors',
            link: '/v2/distributors',
          },
          {
            text: `Distributor - ${props.distributor ? props.distributor.name : 'loading...'}`,
            link: `/v2/distributor-detail/${props.distributorId}`,
          },
        ] : [],
        ...!props.distributorId && [
          {
            text: 'Companies',
            link: '/v2/companies',
          },
        ],
        {
          text: `Company - ${props.company ? props.company.name : '...loading'}`,
        },
      ]}
    />
    <div>
      <Card
        title="Schools"
      >
        <SchoolListContainer
          distributorId={props.distributorId}
          companyId={props.companyId}
        />
      </Card>
      <Separator size="md" />
      <ManagerSceneContainer
        title="Company Managers"
        endpointUrl={`/companies/${props.companyId}/managers`}
        initialValues={{
          company: props.companyId,
        }}
      />
    </div>
  </div>
);

CompanyDetailScene.propTypes = {
  company: PropTypes.object,
  distributor: PropTypes.object,
  companyId: PropTypes.string.isRequired,
  distributorId: PropTypes.string,
};

CompanyDetailScene.defaultProps = {
  company: null,
  distributor: null,
  distributorId: null,
};

export default CompanyDetailScene;
