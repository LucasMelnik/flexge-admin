import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default class TextEditor extends Component {
  static propTypes = {
    style: PropTypes.object,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.shape({}),
  };

  static defaultProps = {
    style: null,
    placeholder: null,
    readOnly: false,
    value: null,
    onChange: null,
    options: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
      ],
    },
  };

  render() {
    return (
      <ReactQuill
        style={this.props.style}
        placeholder={this.props.placeholder}
        modules={this.props.options}
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
