import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';

const SchoolListScene = props => (
  <div>
    {(!props.distributorId && !props.companyId) && (
      <Breadcrumb
        crumbs={[
          {
            text: 'Schools',
          },
        ]}
      />
    )}
    <Card
      title="Schools"
      actions={[
        <Button
          label="New school"
          icon="fa-plus"
          onClick={() => browserHistory.push(
            props.distributorId ?
          `/distributors/${props.distributorId}/companies/${props.companyId}/schools/new` :
            props.companyId ? `/companies/${props.companyId}/schools/new` : `/schools/new`)}
        />,
      ]}
    >
      <SchoolListFilterContainer />
      <SchoolListContainer
        distributorId={props.distributorId}
        companyId={props.companyId}
      />
    </Card>
  </div>
);

SchoolListScene.propsTypes = {
  distributorId: PropTypes.string,
  companyId: PropTypes.string,
};

SchoolListScene.defaultProps = {
  distributorId: null,
  companyId: null,
};

export default SchoolListScene;
