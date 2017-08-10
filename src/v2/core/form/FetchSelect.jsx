import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { sortBy } from 'lodash';
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';
import './Select.css';

export default class FetchSelect extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    resultTransformer: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    description: PropTypes.string,
    fieldValidation: PropTypes.string,
    optionsTransformer: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Select...',
    value: null,
    fieldValidation: null,
    description: null,
    optionsTransformer: option => ({
      label: option.name,
      value: option.id,
    })
  };

  state = { data: [] };

  componentWillMount() {
    axios.request({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/${this.props.url}`,
      headers: {
        ...localStorage.accessToken && { Authorization: `Bearer ${localStorage.accessToken}` },
      },
    }).then((response) => {
      const data = response.data.docs || response.data;
      this.setState({
        data: sortBy(data, item => item[this.props.resultTransformer.text].toLowerCase()),
      }, () => {
        if (this.props.defaultSelect) {
          this.props.onChange(this.state.data[0].id || null);
        }
      });

      return data;
    });
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            fontWeight: 400,
            color: '#555555',
            marginBottom: 10,
          }}
        >
          <div>
            {this.props.label}
          </div>
          <div style={{
            marginLeft: 15,
            fontSize: 13,
            color: 'red',
          }}>
            {this.props.description}
          </div>
        </div>
        <div
          style={this.props.fieldValidation && { border: '1px solid red' }}
        >
          {this.state.data.map(item => {
            console.log({
              label: item.name,
              value: item.id,
            })
          })}
          <Select2
            placeholder={this.props.placeholder}
            value={this.props.value}
            options={this.state.data.map(this.props.optionsTransformer)}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
}
