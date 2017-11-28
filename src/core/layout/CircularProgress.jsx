import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import Separator from './Separator';

const getPercentage = (value, max) => (value / max) * 100;

const getStatus = (value) => {
  if (value >= 70) {
    return 'success';
  } else if (value < 70 && value >= 35) {
    return 'active';
  } else if (value < 35) {
    return 'exception';
  }
  return null;
};

const getValueLegend = (value) => {
  if (value >= 70) {
    return 'Excellent';
  } else if (value < 70 && value >= 35) {
    return 'Moderate';
  } else if (value < 35) {
    return 'Weak';
  }
  return null;
};

const CircularProgress = props => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 250,
    }}
  >
    <p
      style={{
        color: '#424242',
        fontSize: 14,
        textAlign: 'center',
        height: 40,
      }}
    >
      {props.title}
    </p>
    <Separator size="sm" />
    <Progress
      type="circle"
      percent={getPercentage(props.value, props.max)}
      status={getStatus(getPercentage(props.value, props.max))}
      format={() => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              color: '#424242',
              fontSize: 32,
            }}
          >
            {props.valueRender ? props.valueRender(props.value) : props.value}
          </p>
          <Separator size="xs" />
          <small
            style={{
              fontSize: 12,
              color: '#424242',
            }}
          >
            {getValueLegend(getPercentage(props.value, props.max))}
          </small>
        </div>
      )}
    />
    {props.legend && (
      <Separator size="xs" />
    )}
    {props.legend && (
      <small>{props.legend}</small>
    )}
  </div>
);

CircularProgress.propTypes = {
  title: PropTypes.string.isRequired,
  valueLabel: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  legend: PropTypes.string,
  valueRender: PropTypes.func,
};

CircularProgress.defaultProps = {
  legend: null,
  valueRender: null,
};

export default CircularProgress;
