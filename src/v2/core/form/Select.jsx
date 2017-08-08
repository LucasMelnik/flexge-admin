import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { sortBy } from 'lodash';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

export default class Select extends Component {

  static propTypes = {
    id: PropTypes.string,
    url: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    resultTransformer: PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,

  };

  static defaultProps = {
    id: null,
    placeholder: 'Select...',

  };

  componentDidMount() {
    $(`#${this.props.id}`).select2({
        placeholder: this.props.placeholder,
        allowClear: true,
    })
  }

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
          this.props.onSelect(this.state.data[0]);
        }
      });
      return response.data;
    });
  }


    render() {
      return (
        <select className="" id={this.props.id} style={{ width: '100%'}}>
          <option></option>
          {this.state.data.map(item => (
            <option>{item.name}</option>
          ))}
        </select>
      )
    }
}
