import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolClassListFilterContainer from './SchoolClassListFilterContainer';
import SchoolClassListContainer from './SchoolClassListContainer';

const SchoolClassListScene = props => (
  <div>
    {(!props.distributorId && !props.companyId && !props.schoolId) && (
      <Breadcrumb
        crumbs={[
          {
            text: 'Classes',
          },
        ]}
      />
    )}
    <Card
      title="Classes"
      actions={
        <Button
          label="New class"
          icon="fa-plus"
          onClick={() => browserHistory.push(
            props.distributorId ?
          `/distributors/${props.distributorId}/companies/${props.companyId}/schools/${props.schoolId}/classes/new` :
            props.companyId ? `/companies/${props.companyId}/schools/${props.schoolId}/classes/new` :
            props.schoolId ? `/schools/${props.schoolId}/classes/new` : '/classes/new'
          )}
        />
      }
    >
      <SchoolClassListFilterContainer />
      <SchoolClassListContainer
        distributorId={props.distributorId}
        companyId={props.companyId}
        schoolId={props.schoolId}
      />
    </Card>
  </div>
);

SchoolClassListScene.propsTypes = {
  distributorId: PropTypes.string,
  companyId: PropTypes.string,
  schoolId: PropTypes.string,
};

SchoolClassListScene.defaultProps = {
  distributorId: null,
  companyId: null,
  schoolId: null,
};

export default SchoolClassListScene;
