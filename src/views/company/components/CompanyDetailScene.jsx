import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolListFilterContainer from '../../school/components/SchoolListFilterContainer';
import SchoolListContainer from '../../school/components/SchoolListContainer';

const CompanyDetailScene = props => (
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
        {
          text: 'Companies',
          link: '/companies',
        },
        {
          text: `Company - ${props.company.name}`,
        },
      ]}
    />
    <Card
      title="Schools"
      loading={props.fetching}
      actions={
        <Button
          type="primary"
          label="New school"
          icon="plus"
          onClick={() => browserHistory.push(`${props.baseUrl}/schools/new`)}
        />
      }
    >
      <SchoolListFilterContainer />
      {props.company.id && (
        <SchoolListContainer
          baseUrl={props.baseUrl}
          companyId={props.company.id}
        />
      )}
    </Card>
  </div>
);

CompanyDetailScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  company: PropTypes.object,
  distributor: PropTypes.object,
};

CompanyDetailScene.defaultProps = {
  company: {},
  distributor: {},
};

export default CompanyDetailScene;
