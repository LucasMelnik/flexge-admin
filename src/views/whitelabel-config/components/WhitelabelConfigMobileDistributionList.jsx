import React from 'react';
import PropTypes from 'prop-types';
import startCase from 'lodash/startCase';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Table from '../../../core/form/Table';
import Async from '../../../core/layout/Async';
import Button from '../../../core/form/Button';
import ImagePreview from '../../../core/layout/ImagePreview';

const WhitelabelConfigMobileDistributionList = props => (
  <Async fetching={props.fetching}>
    <Row>
      <Column size={12}>
        <p>
          Add the logo and icons for each app, so we can be able to create and publish the apps under the whitelabel name.
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
          label: 'Logo',
          path: 'logoUrl',
          render: cell => cell && <ImagePreview src={cell} />
        },
        {
          label: 'iOS Icon',
          path: 'iosIconUrl',
          render: cell => cell && <ImagePreview src={cell} />
        },
        {
          label: 'Android Icon',
          path: 'androidIconUrl',
          render: cell => cell && <ImagePreview src={cell} />
        },
        {
          label: 'Android Icon Background',
          path: 'androidIconBackgroundUrl',
          render: cell => cell && <ImagePreview src={cell} />
        },
        {
          label: 'Android Icon Logo',
          path: 'androidIconLogoUrl',
          render: cell => cell && <ImagePreview src={cell} />
        },
        {
          label: 'Actions',
          path: 'action',
          render: (cell, row) => (
            <React.Fragment>
              <Button
                icon="edit"
                onClick={() => props.onUpdateDistribution(row.app)}
              />
              {' '}
              <Button
                icon="delete"
                onClick={() => props.onRemoveDistribution(row)}
              />
            </React.Fragment>
          ),
        },
      ]}
    />
  </Async>
);

WhitelabelConfigMobileDistributionList.propTypes = {
  fetching: PropTypes.bool,
  distributions: PropTypes.arrayOf(PropTypes.object),
  onUpdateDistribution: PropTypes.func.isRequired,
  onRemoveDistribution: PropTypes.func.isRequired,
};

WhitelabelConfigMobileDistributionList.defaultProps = {
  fetching: false,
  distributions: [],
};

export default WhitelabelConfigMobileDistributionList;
