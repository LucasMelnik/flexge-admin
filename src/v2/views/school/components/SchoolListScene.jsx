import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';

const SchoolListScene = props => (
  <Card
    title="Schools"
    actions={[
      <Button
        label="New school"
        icon="fa-plus"
        onClick={() => browserHistory.push(`/v2/companies/${props.companyId}/schools/new`)}
      />,
    ]}
  >
    <SchoolListFilterContainer />
    <SchoolListContainer companyId={props.companyId} />
  </Card>
);

SchoolListScene.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default SchoolListScene;
