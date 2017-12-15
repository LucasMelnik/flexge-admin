import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';
import Separator from './Separator';
import TooltipIcon from './TooltipIcon';
import Async from './Async';

export default class CircularProgress extends Component {

  state = { value: 0 }

  static propTypes = {
    title: PropTypes.string.isRequired,
    noDataText: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    legend: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    tooltip: PropTypes.string,
    valueRender: PropTypes.func,
    successCondition: PropTypes.func.isRequired,
    badCondition: PropTypes.func.isRequired,
  };

  static defaultProps = {
    legend: false,
    tooltip: null,
    value: null,
    valueRender: null,
  };

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      this.setState({ value: nextProps.value });
    }, 300);
  }

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
    const percent = this.getPercentage(this.state.value, this.props.max);
    return (
      <Async fetching={this.props.fetching}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              color: '#424242',
              fontSize: 14,
            }}
          >
            {this.props.title}
            {this.props.tooltip && (
              <TooltipIcon text={this.props.tooltip} />
            )}
          </div>
          <Separator size="xs" />
          <Progress
            type="circle"
            percent={(percent < 1 && this.props.value !== null && this.props.value !== undefined) ? 100 : percent}
            status={percent < 1 ? 'exception' : this.getStatus(this.state.value)}
            strokeWidth={10}
            format={() => (this.props.value !== null && this.props.value !== undefined) ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    color: '#424242',
                    fontSize: 32,
                  }}
                >
                  {this.props.valueRender ? this.props.valueRender(this.props.value) : this.props.value}
                </div>
                <small
                  style={{
                    fontSize: 12,
                    color: '#424242',
                  }}
                >
                  {this.getValueLegend(this.props.value)}
                </small>
              </div>
            ) : (
              <small
                style={{
                  fontSize: 14,
                  color: '#424242',
                }}
              >
                {this.props.noDataText}
              </small>
            )}
          />
          <div style={{ height: 12 }}>
            {this.props.legend && (
              <small>{this.props.legend}</small>
            )}
          </div>
        </div>
      </Async>
    );
  }
}
