import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';

export default class UploadContentForm extends Component {
  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
  };

  static defaultProps = {
    values: {},
    errors: {},
    submitting: false,
  };

  handleChange = (event) => {
    this.props.onChange('file', event.target.files[0]);
    this.props.onUpload();
  };

  render() {
    return (
      <Row>
        <Column size={12}>
          <Button
            label="Select the content file"
            loading={this.props.submitting}
            onClick={() => this.fileInput.click()}
            icon="file-add"
          />
          <input
            type="file"
            style={{
              visibility: 'hidden',
              width: 0,
              height: 0,
            }}
            value={''}
            onChange={this.handleChange}
            ref={(input) => { this.fileInput = input; }}
            accept="text/csv"
          />
        </Column>
      </Row>
    );
  }
}
