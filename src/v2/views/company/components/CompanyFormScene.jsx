import React from 'react';
import PropTypes from 'prop-types';
import CompanyFormContainer from './CompanyFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Separator from '../../../core/layout/Separator';

const CompanyFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/v2/companies',
        },
        {
          text: props.params.companyId ? 'Edit Company' : 'Create Company',
        },
      ]}
    />
    <CompanyFormContainer companyId={props.params.companyId} />
    {props.params.companyId && (
      <div>
        <Separator size="md" />
        <ManagerSceneContainer
          title="Company Managers"
          endpointUrl={`/companies/${props.params.companyId}/managers`}
          initialValues={{
            company: props.params.companyId,
          }}
        />
      </div>
    )}
  </div>
);

CompanyFormScene.propTypes = {
  params: PropTypes.shape({
    companyId: PropTypes.string,
  }),
};

CompanyFormScene.defaultProps = {
  params: null,
};

export default CompanyFormScene;
