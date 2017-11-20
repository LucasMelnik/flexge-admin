import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CompanyListFilterContainer from './CompanyListFilterContainer';
import CompanyListContainer from './CompanyListContainer';

const CompanyListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Companies',
        },
      ]}
    />
    <Card
      title="Companies"
      actions={
        <Button
          label="New company"
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push('/companies/new')}
        />
      }
    >
      <CompanyListFilterContainer />
      <CompanyListContainer distributorId={props.distributorId} />
    </Card>
  </div>
);

CompanyListScene.propsTypes = {
  distributorId: PropTypes.string,
};

CompanyListScene.defaultProps = {
  distributorId: null,
};

export default CompanyListScene;
