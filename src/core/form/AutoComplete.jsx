import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, AutoComplete as AntAutoComplete } from 'antd';

export default class AutoComplete extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    value: PropTypes.oneOfType([PropTypes.string]).isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    labelPath: PropTypes.string.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    label: '',
    disabled: false,
  };

  renderOptions = item => (
    <AntAutoComplete.Option key={item.id}>
      {item[this.props.labelPath]}
    </AntAutoComplete.Option>
  );

  render() {
    return (
      <Form.Item
        colon={false}
        label={this.props.label}
      >
        <AntAutoComplete
          allowClear
          dropdownMatchSelectWidth={false}
          disabled={this.props.disabled}
          value={this.props.value}
          onSelect={(value) => this.props.onSelect(value, this.props.dataSource.find(item => item.id === value))}
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          optionLabelProp={this.props.labelPath}
          style={{
            width: '100%',
          }}
        >
          {this.props.dataSource.map(this.renderOptions)}
        </AntAutoComplete>
      </Form.Item>
    );
  }
}