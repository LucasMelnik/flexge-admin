import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import theme from 'react-quill/dist/quill.snow.css';

export default class TextEditor extends Component {

  state = { error: false }

  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    placeholder: null,
    readOnly: false,
    value: null,
    onChange: null,
  }

  constructor(props) {
    super(props);
    this.defaultModules = {
      toolbar: [
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' },
        ],
        ['clean'],
      ],
    };
  }

  render() {
    return (
      <ReactQuill
        style={this.props.style}
        placeholder={this.props.placeholder}
        modules={this.defaultModules}
        readOnly={this.props.readOnly}
        value={this.props.value}
        onKeyPress={this.onKeyPress}
        onChange={this.props.onChange}
      >
        {/* <div
          style={{
            border: (this.props.value.length === 0 || this.props.value === '<p><br></p>') && '1px solid red',
          }}
        /> */}
      </ReactQuill>
    );
  }

}
