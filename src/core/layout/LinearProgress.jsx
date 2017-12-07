import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

const LinearProgress = props => (
  <Progress
    status={{
      green: 'success',
      blue: 'active',
    }[props.color]}
    percent={props.value}
  />
);

LinearProgress.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['green', 'blue']),
};

LinearProgress.defaultProps = {
  color: 'blue',
};

export default LinearProgress;
