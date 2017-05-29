import React from 'react';
// import PropTypes from 'prop-types';
import Table from '../../core/content/Table';

const CompanyManagerList = () => (
  <Table
    columns={[
      {
        label: 'Name',
        path: 'name',
      },
    ]}
    rows={[
      {
        id: 1,
        name: 'Rafael',
      },
      {
        id: 2,
        name: 'Juciel',
      },
      {
        id: 3,
        name: 'Filipe',
      },
    ]}
    selectable
  />
);

// CompanyManagerList.propTypes = {
//   companies: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   })).isRequired,
//   fetching: PropTypes.bool.isRequired,
// };

export default CompanyManagerList;
