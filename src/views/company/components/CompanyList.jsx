import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const CompanyList = props => (
  <Card
    flexible
  >
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
        ]}
        rows={props.companies}
        selectable
        onSelect={row => browserHistory.push(`/companies/${row.id}`)}
      />
    </Async>
  </Card>
);

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default CompanyList;
