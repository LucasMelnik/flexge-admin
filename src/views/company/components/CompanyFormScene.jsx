import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CompanyFormContainer from './CompanyFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Separator from '../../../core/layout/Separator';
import Card from '../../../core/layout/Card';

const CompanyFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/companies',
        },
        {
          text: props.params.companyId ? 'Edit Company' : 'Create Company',
        },
      ]}
    />
    <Card
      title={props.params.companyId ? 'Edit Company' : 'Create Company'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push('/companies')}
          />
        )
      }
    >
      <CompanyFormContainer companyId={props.params.companyId} />
    </Card>
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
