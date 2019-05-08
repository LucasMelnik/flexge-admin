import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import Table from '../../../core/form/Table';
import FormButtons from '../../../core/form/FormButtons';
import { MASTERTEST_DISTRIBUTOR_ID } from '../../../core/consts';

export default class ImportSchoolForm extends Component {
  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit();
        }}
      >
        <Row>
          <Column size={4}>
            <FetchSelect
              url="/distributors"
              disabled={this.props.submitting}
              label="Select a distributor to import the schools"
              value={get(this.props.values, 'distributor', '')}
              onChange={(school) => this.props.onChange('distributor', school)}
              description={get(this.props.errors, 'distributor', null)}
              fieldValidation={get(this.props.errors, 'distributor', null) && 'error'}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </Column>
          {get(this.props.values, 'distributor', null) && (
            <Column size={4}>
              <div
                style={{
                  paddingTop: 43,
                }}
              >
                <Button
                  label="Import a XLSX file"
                  disabled={this.props.submitting}
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
              </div>
            </Column>
          )}
        </Row>
        {get(this.props.values, 'schools', null) && (
          <div>
            <Row>
              <Column size={12}>
                <p>
                  Check the schools below and in case of errors import a fixed spreadsheet.
                  Schools with error will not be created.
                </p>
              </Column>
              <Column size={12}>
                <Table
                  rows={get(this.props.values, 'schools', [])}
                  columns={[
                    ...[
                      {
                        label: 'Name',
                        path: 'name',
                      },
                      {
                        label: 'CompanyID',
                        path: 'companyId',
                      },
                      {
                        label: 'Region',
                        path: 'region',
                      },
                      {
                        label: 'State',
                        path: 'state',
                      },
                      {
                        label: 'City',
                        path: 'city',
                      },
                      {
                        label: 'Address',
                        path: 'address',
                      },
                      {
                        label: 'Phone',
                        path: 'phone',
                      },
                    ],
                    ...(get(this.props.values, 'distributor', '') === MASTERTEST_DISTRIBUTOR_ID ? [
                      {
                        label: 'INEP',
                        path: 'inep',
                      },
                    ] : []),
                    ...[
                      {
                        label: 'Errors',
                        path: 'errors',
                        render: value => value && value.reduce((acc, error, index) => acc.concat(index ? `, ${error}` : error), ''),
                      },
                    ]
                  ]}
                />
              </Column>
            </Row>
            <FormButtons
              confirmLabel="Confirm Import"
              isDisabled={this.props.submitting}
              isSubmitting={this.props.submitting}
              onReset={this.props.onReset}
            />
          </div>
        )}
      </form>
    );
  }
}
