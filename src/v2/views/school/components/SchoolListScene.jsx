import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from './SchoolListFilterContainer';
import SchoolListContainer from './SchoolListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const SchoolListScene = props => (
  <div>
    {/* <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
          link: ' ',
        },
      ]}
    /> */}
    <Card
      title="Schools"
      actions={[
        <Button
          label="New school"
          icon="fa-plus"
          onClick={() => hashHistory.push(
            props.distributorId ?
          `/v2/distributors/${props.distributorId}/companies/${props.companyId}/schools/new` :
            props.companyId ? `/v2/companies/${props.companyId}/schools/new` : `/v2/schools/new`)}
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
