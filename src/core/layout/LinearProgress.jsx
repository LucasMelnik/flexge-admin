import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

const LinearProgress = props => (
  <Progress
    status={{
      green: 'success',
      blue: 'active',
    }[props.color]}
    percent={props.value <= 100 ? props.value : 100}
    showInfo={props.showInfo}
  />
);

LinearProgress.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['green', 'blue']),
  showInfo: PropTypes.bool,
};

LinearProgress.defaultProps = {
  color: 'blue',
  showInfo: true,
};

export default LinearProgress;
