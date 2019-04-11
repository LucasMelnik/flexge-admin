import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import startCase from 'lodash/startCase';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Table from '../../../core/form/Table';
import Separator from '../../../core/layout/Separator';
import Async from '../../../core/layout/Async';
import Tag from '../../../core/layout/Tag';
import Button from '../../../core/form/Button';

const WhitelabelConfigWebDistribution = props => (
  <Async fetching={props.fetching}>
    <Row>
      <Column size={12}>
        <p>
          To allow the access through the custom domain, we need a SSL certificate approved in AWS.
          We already request it but you need to add the below config to you DNS register, so the certificate can be issued.
        </p>
      </Column>
    </Row>
    <Table
      showTableCount={false}
      rows={get(props.certificate, 'DomainValidationOptions', [])}
      columns={[
        {
          label: 'Domain Name',
          path: 'DomainName',
        },
        {
          label: 'Value to add to DNS register',
          path: 'ResourceRecord',
          render: cell => `${cell.Name} -> ${cell.Type} -> ${cell.Value}`,
        },
        {
          label: 'Status',
          path: 'ValidationStatus',
          render: cell => (
            <Tag color={cell === 'SUCCESS' ? 'green' : 'grey'}>
              {cell}
            </Tag>
          ),
        },
      ]}
    />
    <Separator />
    <Row>
      <Column size={12}>
        <p>
          When the certificate is ready, we can deploy each app under the custom domain. Also the user will need to map the CNAME is his DNS register.
        </p>
      </Column>
    </Row>
    <Table
      showTableCount={false}
      rowKey={row => row.app}
      rows={props.distributions || []}
      columns={[
        {
          label: 'Application Name',
          path: 'app',
          render: cell => startCase(cell.toLowerCase()),
        },
        {
          label: 'CNAME to point on DNS register',
          path: 'distributionDomain',
        },
        {
          label: 'Status',
          path: 'status',
          render: cell => (
            <Tag
              color={{
                CREATING: 'blue',
                DEPLOYED: 'green',
                DISABLING: 'yellow',
                DISABLED: 'red',
              }[cell]}
            >
              {startCase((cell || 'UNAVAILABLE').toLowerCase()) }
            </Tag>
          ),
        },
        {
          label: 'Actions',
          path: 'action',
          render: (cell, row) => (
            <React.Fragment>
              {!row.status && (
                <Button
                  icon="cloud-upload"
                  onClick={() => props.onCreateDistribution(row)}
                />
              )}
              {row.status === 'DEPLOYED' && (
                <Button
                  icon="cloud-download"
                  onClick={() => props.onDisableDistribution(row)}
                />
              )}
            </React.Fragment>
          ),
        },
      ]}
    />
  </Async>
);

WhitelabelConfigWebDistribution.propTypes = {
  fetching: PropTypes.bool,
  certificate: PropTypes.object,
  distributions: PropTypes.arrayOf(PropTypes.object),
  onCreateDistribution: PropTypes.func.isRequired,
  onDisableDistribution: PropTypes.func.isRequired,
};

WhitelabelConfigWebDistribution.defaultProps = {
  fetching: false,
  certificate: {},
  distributions: [],
};

export default WhitelabelConfigWebDistribution;
