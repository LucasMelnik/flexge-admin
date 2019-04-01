import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const WhitelabelConfigList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Domain',
        path: 'domain',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Owner',
        path: 'distributor.name',
        render: (cell, row) => get(row.distributor, 'name', get(row.company, 'name', 'No Owner')),
      },
      {
        label: 'Apps',
        path: 'cloudfrontDistributions',
        render: cell => (cell || []).reduce((acc, distribution) => acc.concat(distribution.app).concat(' -> ').concat(distribution.distributionDomain).concat('\n'), ''),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/whitelabel-configs/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.configs}
  />
);

WhitelabelConfigList.propTypes = {
  configs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default WhitelabelConfigList;
