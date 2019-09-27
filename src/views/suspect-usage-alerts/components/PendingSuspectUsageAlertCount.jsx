import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Tag from '../../../core/layout/Tag';

const PendingSuspectUsageAlertCount = props => (
  <div
    style={{
      position: 'fixed',
      top: 16.5,
      right: 45
    }}
  >
    <Link to="/suspect-usage-alerts">
      <Tag color="red">
        {props.count} Pending usage alerts!
      </Tag>
    </Link>
  </div>
);

PendingSuspectUsageAlertCount.propTypes = {
  count: PropTypes.number.isRequired,
};

export default PendingSuspectUsageAlertCount;
