import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolFormContainer from './SchoolFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...(props.distributorId) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: props.distributor ? `Distributor - ${props.distributor.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}`,
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/distributor-detail/${props.distributorId}/company-detail/${props.companyId}`,
          },
        ] : (props.companyId) ? [
          {
            text: 'Companies',
            link: '/companies',
          },
          {
            text: props.company ? `Company - ${props.company.name}` : 'loading...',
            link: `/company-detail/${props.companyId}`,
          },
        ] : [],
        {
          text: `${props.schoolId ? 'Update School' : 'Create School'}`,
        },
      ]}
    />
    <Card
      title={props.schoolId ? 'Update School' : 'Create School'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <SchoolFormContainer
        companyId={props.companyId}
        schoolId={props.schoolId}
      />
    </Card>
  </div>
);

SchoolFormScene.propTypes = {
  companyId: PropTypes.string,
  distributorId: PropTypes.string,
  schoolId: PropTypes.string,
  company: PropTypes.object,
  distributor: PropTypes.object,
};

SchoolFormScene.defaultProps = {
  companyId: null,
  distributorId: null,
  schoolId: null,
  company: null,
  distributor: null,
};

export default SchoolFormScene;
