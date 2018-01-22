import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete as AntAutoComplete } from 'antd';

export default class AutoComplete extends Component {

  static propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    value: PropTypes.oneOfType([PropTypes.string]).isRequired,
    onSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    labelPath: PropTypes.string.isRequired,
  };

  renderOptions = item => (
    <AntAutoComplete.Option key={item.id}>
      {item[this.props.labelPath]}
    </AntAutoComplete.Option>
  );

  render() {
    return (
      <AntAutoComplete
        allowClear
        dropdownMatchSelectWidth={false}
        value={this.props.value}
        dataSource={this.props.dataSource.map(this.renderOptions)}
        onSelect={(value) => this.props.onSelect(value, this.props.dataSource.find(item => item.id === value))}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        optionLabelProp={this.props.labelPath}
        style={{
          width: '100%',
        }}
      />
    );
  }
}