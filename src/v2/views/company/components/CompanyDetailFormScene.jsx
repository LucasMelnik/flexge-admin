import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CompanyDetailFormContainer from './CompanyDetailFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Separator from '../../../core/layout/Separator';
import Card from '../../../core/layout/Card';
import SchoolListScene from '../../school/components/SchoolListScene';

const CompanyFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/v2/companies',
        },
        {
          text: 'Detail Company',
        },
      ]}
    />
    <Card
      title="Detail Company"
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push('/v2/companies')}
          />
        )
      }
    >
      <CompanyDetailFormContainer companyId={props.params.companyId} />
    </Card>
    {props.params.companyId && (
      <div>
        <Separator size="md" />
        <SchoolListScene
          companyId={props.params.companyId}
        />
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
