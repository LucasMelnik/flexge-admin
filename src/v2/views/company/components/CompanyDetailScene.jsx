import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Separator from '../../../core/layout/Separator';
import SchoolListScene from '../../school/components/SchoolListScene';

const CompanyDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/v2/companies',
        },
        {
          text: `Company - ${props.company ? props.company.name : '...loading'}`,
        },
      ]}
    />
    <div>
      <Separator size="md" />
      <SchoolListScene
        companyId={props.companyId}
      />
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
  companyId: PropTypes.string.isRequired,
};

CompanyDetailScene.defaultProps = {
  company: null,
};

export default CompanyDetailScene;
