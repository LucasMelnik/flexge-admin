import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const CompanyManagerList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Email',
          path: 'email',
        },
      ]}
      rows={props.managers}
    />
  </Async>
);

CompanyManagerList.propTypes = {
  managers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CompanyManagerList;
