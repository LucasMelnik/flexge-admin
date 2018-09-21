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
      fetching={props.fetching}
      crumbs={[
        ...(props.distributor && props.distributor.name) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: `Distributor - ${props.distributor.name}`,
            link: `/distributors/${props.distributor.id}/details`,
          },
        ] : [],
        ...(props.company && props.company.name) ? [
          {
            text: 'Companies',
            link: '/companies',
          },
          {
            text: `Company - ${props.company.name}`,
            link: `/companies/${props.company.id}/details`,
          },
        ] : [],
        {
          text: 'Schools',
          link: '/schools',
        },
        {
          text: `${props.schoolId ? 'Update School' : 'Create School'}`,
        },
      ]}
    />
    <Card
      title={props.schoolId ? 'Update School' : 'Create School'}
      loading={props.fetching}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <SchoolFormContainer
        schoolId={props.schoolId}
        currentCompany={props.currentCompany}
        companyCountry={props.company.country}
      />
    </Card>
  </div>
);

SchoolFormScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  distributor: PropTypes.object,
  company: PropTypes.object,
  schoolId: PropTypes.string,
  currentCompany: PropTypes.string,
};

SchoolFormScene.defaultProps = {
  distributor: {},
  company: {},
  schoolId: null,
  currentCompany: null,
};

export default SchoolFormScene;
