import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';

export default class DataImportForm extends Component {
  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
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
      <div>
        <Row>
          <Column size={12}>
            {['VALIDATE_COMPLETED'].some(s => s === this.props.values.status) && (
              <React.Fragment>
                <Button
                  label="Confirm import"
                  onClick={this.props.onConfirm}
                  disabled={this.props.submitting || this.props.values.hasErrors}
                  icon="check"
                  type="primary"
                />
                <ColumnSeparator />
              </React.Fragment>
            )}
            {['VALIDATE_COMPLETED', 'ERROR'].some(s => s === this.props.values.status) && (
              <React.Fragment>
                <Button
                  label="Cancel import"
                  onClick={this.props.onCancel}
                  disabled={this.props.submitting}
                  icon="close"
                  type="danger"
                />
                <ColumnSeparator />
              </React.Fragment>
            )}
            <Button
              label="Import a XLSX file"
              disabled={
                this.props.submitting ||
                !this.props.values.distributor ||
                (this.props.values.id && !['IMPORT_COMPLETED', 'VALIDATE_COMPLETED', 'ERROR'].some(s => s === this.props.values.status))
              }
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
              accept="xlsx/*"
            />
          </Column>
        </Row>
        <br/>
        <Row>
          <Column size={12}>
            {['PENDING', 'VALIDATING', 'IMPORTING'].some(s => s === this.props.values.status) && (
              <React.Fragment>
                <Spin size="default" />
                <ColumnSeparator />
              </React.Fragment>
            )}
            <p style={{ display: 'inline-block' }}>
              {{
                PENDING: 'File uploaded, validating...',
                VALIDATING: 'File validation in progress.',
                VALIDATE_COMPLETED: this.props.values.hasErrors ? 'There are some errors in the imported spreadsheet. Please check the tabs below.' : 'Validation has passed! Click on "Confirm import" to start the import.',
                IMPORTING: 'Saving data...',
                IMPORT_COMPLETED: 'Importing finished. Please check the tabs below to confirm if everything is saved.',
              }[this.props.values.status]}
            </p>
          </Column>
        </Row>
      </div>
    );
  }
}
