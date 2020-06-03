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
    fetching: PropTypes.bool,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    errorText: PropTypes.string,
    labelPath: PropTypes.string.isRequired,
    accessoryLabelPath: PropTypes.string.isRequired,
  };

  static defaultProps = {
    placeholder: '',
    label: '',
    errorText: null,
    required: false,
    disabled: false,
    fetching: false,
  };

  renderOptions = item => (
    <AntAutoComplete.Option key={item.id}>
      {item[this.props.labelPath]}
      {this.props.accessoryLabelPath && ` - ${item[this.props.accessoryLabelPath]}`}
    </AntAutoComplete.Option>
  );

  getValue = () => {
    const row = this.props.dataSource && this.props.dataSource.find(item => item.id === this.props.value);
    return row ? row[this.props.labelPath] : this.props.value;
  };

  render() {
    return (
      <Form.Item
        colon={false}
        required={this.props.required}
        label={this.props.label}
        help={this.props.errorText}
        hasFeedback={this.props.fetching}
        validateStatus={(this.props.fetching && 'validating') || (this.props.errorText && 'error')}
      >
        <AntAutoComplete
          allowClear
          dropdownMatchSelectWidth={false}
          disabled={this.props.disabled}
          value={this.getValue()}
          onSelect={value => this.props.onSelect(value, this.props.dataSource.find(item => item.id === value))}
          onSearch={this.props.onChange}
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