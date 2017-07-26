import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    this.toolbarOptions = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],

        [{ 'size': ['small', false, 'large', 'huge'] }],

        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],

        ['clean'],
      ],
    };

    this.noToolbar = {
      toolbar: [],
    };
  }

  render() {
    return (
      <ReactQuill
        style={this.props.style}
        placeholder={this.props.placeholder}
        modules={this.toolbarOptions}
        readOnly={this.props.readOnly}
        value={this.props.value}
        onKeyPress={this.onKeyPress}
        onChange={this.props.onChange}
      >
        <div
          style={{
            background: this.props.readOnly && '#efefef',
          }}
        />
      </ReactQuill>
    );
  }

}
