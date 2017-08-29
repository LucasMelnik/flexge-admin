import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolListScene from '../../school/components/SchoolListScene';

const CompanyDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        ...props.distributorId ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: `Distributor - ${props.distributor ? props.distributor.name : 'loading...'}`,
            link: `/distributor-detail/${props.distributorId}`,
          },
        ] : props.companyId ? [
          {
            text: 'Companies',
            link: '/companies',
          },
        ] : [],
        {
          text: `Company - ${props.company ? props.company.name : '...loading'}`,
        },
      ]}
    />
    <SchoolListScene
      distributorId={props.distributorId}
      companyId={props.companyId}
    />
  </div>
);

CompanyDetailScene.propTypes = {
  company: PropTypes.object,
  distributor: PropTypes.object,
  companyId: PropTypes.string.isRequired,
  distributorId: PropTypes.string,
};

CompanyDetailScene.defaultProps = {
  company: null,
  distributor: null,
  distributorId: null,
};

export default CompanyDetailScene;
