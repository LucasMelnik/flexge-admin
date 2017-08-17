import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolFormContainer from './SchoolFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
          link: '/v2/companies',
        },
        {
          text: 'Detail Company',
          link: `/v2/company-detail/${props.params.companyId}`,
        },
        {
          text: props.params.schoolId ? 'Edit School' : 'Create School',
        },
      ]}
    />
    <Card
      title={props.params.schoolId ? 'Update School' : 'Create School'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push(`/v2/company-detail/${props.params.companyId}`)}
          />
        )
      }
    >
      <SchoolFormContainer
        companyId={props.params.companyId}
        schoolId={props.params.schoolId} />
    </Card>
    {props.params.schoolId && (
      <div>
        <Separator size="md" />
        <ManagerSceneContainer
          title="School Managers"
          endpointUrl={`/schools/${props.params.schoolId}/managers`}
          initialValues={{
            school: props.params.schoolId,
          }}
        />
      </div>
    )}
  </div>
);

SchoolFormScene.propTypes = {
  params: PropTypes.shape({
    companyId: PropTypes.string,
    schoolId: PropTypes.string,
  }),
};

SchoolFormScene.defaultProps = {
  params: null,
};

export default SchoolFormScene;
