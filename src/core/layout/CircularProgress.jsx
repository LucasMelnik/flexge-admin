import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import Separator from './Separator';
import TooltipIcon from './TooltipIcon';

export default class CircularProgress extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    legend: PropTypes.string,
    tooltip: PropTypes.string,
    valueRender: PropTypes.func,
    successCondition: PropTypes.func.isRequired,
    badCondition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    legend: null,
    tooltip: null,
    valueRender: null,
  };

  getPercentage = (value, max) => (value / max) * 100;

  getStatus = (value) => {
    if (this.props.successCondition(value)) {
      return 'success';
    } else if (this.props.badCondition(value)) {
      return 'exception';
    }
    return 'active';
  };

  getValueLegend = (value) => {
    if (this.props.successCondition(value)) {
      return 'Excellent';
    } else if (this.props.badCondition(value)) {
      return 'Weak';
    }
    return 'Moderate';
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p
          style={{
            color: '#424242',
            fontSize: 14,
            textAlign: 'center',
          }}
        >
          {this.props.title}
          {this.props.tooltip && (
            <TooltipIcon text={this.props.tooltip} />
          )}
        </p>
        <Separator size="sm" />
        <Progress
          type="circle"
          percent={this.getPercentage(this.props.value, this.props.max)}
          status={this.getStatus(this.props.value)}
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
                {this.props.valueRender ? this.props.valueRender(this.props.value) : this.props.value}
              </p>
              <Separator size="xs" />
              <small
                style={{
                  fontSize: 12,
                  color: '#424242',
                }}
              >
                {this.getValueLegend(this.props.value)}
              </small>
            </div>
          )}
        />
        {this.props.legend && (
          <Separator size="xs" />
        )}
        {this.props.legend && (
          <span>{this.props.legend}</span>
        )}
      </div>
    );
  }
}
