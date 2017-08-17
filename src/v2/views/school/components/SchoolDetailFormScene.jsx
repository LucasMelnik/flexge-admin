import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolDetailFormContainer from './SchoolDetailFormContainer';
import SchoolClassListContainer from '../../school-class/components/SchoolClassListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
import ManagerSceneContainer from '../../managers/components/ManagerSceneContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolDetailFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Detail Company',
          link: `/v2/companies-detail/${props.params.companyId}`,
        },
        {
          text: 'Detail school',
        },
      ]}
    />
    <Card
      title="Detail school"
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push(`/v2/companies-detail/${props.params.companyId}`)}
          />
        )
      }
    >
      <SchoolDetailFormContainer
        schoolId={props.params.schoolId}
      />
    </Card>
    {props.params.schoolId && (
      <div>
        <Separator size="md" />
        <Card
          title="Classes"
          actions={[
            <Button
              label="New class"
              icon="fa-plus"
              onClick={() => browserHistory.push(`/v2/companies/${props.params.companyId}/schools/${props.params.schoolId}/classes/new`)}
            />,
          ]}
        >
          <SchoolClassListContainer
            companyId={props.params.companyId}
            schoolId={props.params.schoolId}
          />
        </Card>
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

SchoolDetailFormScene.propTypes = {
  params: PropTypes.shape({
    companyId: PropTypes.string,
    schoolId: PropTypes.string,
  }),
};

SchoolDetailFormScene.defaultProps = {
  params: null,
};

export default SchoolDetailFormScene;
