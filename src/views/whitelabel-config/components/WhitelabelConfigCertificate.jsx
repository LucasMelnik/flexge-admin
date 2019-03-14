import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Table from '../../../core/form/Table';
import Separator from '../../../core/layout/Separator';
import Async from '../../../core/layout/Async';

const WhitelabelConfigCertificate = props => (
  <Async fetching={props.fetching}>
    <Row>
      <Column size={4}>
        <TextInput
          required
          disabled={true}
          label="Domain"
          value={get(props.certificate, 'DomainName', '')}
        />
      </Column>
      <Column size={6}>
        <TextInput
          required
          disabled={true}
          label="Alternate Domains"
          value={get(props.certificate, 'SubjectAlternativeNames', []).reduce((acc, domain, index) => acc.concat(index ? ', ' : '').concat(domain), '')}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required
          disabled={true}
          label="Status"
          value={get(props.certificate, 'Status', '')}
        />
      </Column>
    </Row>
    <Separator />
    <Table
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
        },
      ]}
    />
  </Async>
);

WhitelabelConfigCertificate.propTypes = {
  fetching: PropTypes.bool,
  certificate: PropTypes.object,
};

WhitelabelConfigCertificate.defaultProps = {
  fetching: false,
  certificate: {},
};

export default WhitelabelConfigCertificate;
