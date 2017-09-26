import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import MaskInput from '../../../core/form/MaskInput';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import FormButtons from '../../../core/form/FormButtons';
import FileInput from '../../../core/form/FileInput';

class SchoolForm extends Component {

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit();
        }}
      >
        <Row>
          <Column lgSize={6}>
            <TextInput
              disabled={this.props.submitting}
              label="School Name"
              value={get(this.props.values, 'name', '')}
              onChange={value => this.props.onChange('name', value)}
              description={get(this.props.errors, 'name', null)}
              fieldValidation={get(this.props.errors, 'name', null) && 'error'}
            />
          </Column>
          <PermissionValidator
            allowedFor={[
              'ADMIN',
              'DISTRIBUTOR_MANAGER',
            ]}
          >
            <Column lgSize={4}>
              <FetchSelect
                url="/companies"
                disabled={this.props.submitting}
                label="Company"
                value={get(this.props.values, 'company', '')}
                onChange={company => this.props.onChange('company', company)}
                description={get(this.props.errors, 'company', null)}
                fieldValidation={get(this.props.errors, 'company', null) && 'error'}
                resultTransformer={{
                  text: 'name',
                  value: 'id',
                }}
              />
            </Column>
          </PermissionValidator>
          <Column lgSize={2}>
            <MaskInput
              disabled={this.props.submitting}
              label="Foundation Year"
              value={get(this.props.values, 'foundationYear', '')}
              onChange={value => this.props.onChange('foundationYear', value)}
              description={get(this.props.errors, 'foundationYear', null)}
              fieldValidation={get(this.props.errors, 'foundationYear', null) && 'error'}
              blocks={[4]}
              numericOnly
            />
          </Column>
        </Row>
        <Row>
          <Column lgSize={3}>
            <TextInput
              disabled
              label="Country"
              value={get(this.props.values, 'country', '')}
              onChange={value => this.props.onChange('country', value)}
              description={get(this.props.errors, 'country', null)}
              fieldValidation={get(this.props.errors, 'country', null) && 'error'}
            />
          </Column>
          <Column lgSize={3}>
            <Select
              disabled={this.props.submitting}
              label="State"
              value={get(this.props.values, 'state', '')}
              onChange={value => this.props.onChange('state', value)}
              description={get(this.props.errors, 'state', '')}
              fieldValidation={get(this.props.errors, 'state', null) && 'error'}
              options={this.props.states}
            />
          </Column>
          <Column lgSize={6}>
            <TextInput
              disabled={this.props.submitting}
              label="City"
              value={get(this.props.values, 'city', '')}
              onChange={value => this.props.onChange('city', value)}
              description={get(this.props.errors, 'city', null)}
              fieldValidation={get(this.props.errors, 'city', null) && 'error'}
            />
          </Column>
        </Row>
        <Row>
          <Column lgSize={9}>
            <TextInput
              disabled={this.props.submitting}
              label="Address"
              value={get(this.props.values, 'address', '')}
              onChange={value => this.props.onChange('address', value)}
              description={get(this.props.errors, 'address', null)}
              fieldValidation={get(this.props.errors, 'address', null) && 'error'}
            />
          </Column>
          <Column lgSize={3}>
            <MaskInput
              disabled={this.props.submitting}
              label="Phone"
              value={get(this.props.values, 'phone', '')}
              onChange={value => this.props.onChange('phone', value)}
              description={get(this.props.errors, 'phone', null)}
              fieldValidation={get(this.props.errors, 'phone', null) && 'error'}
              maskType="phone"
            />
          </Column>
        </Row>
        {get(this.props.values, 'id', '') && (
          <Row>
            <Column lgSize={4}>
              <FileInput
                label="Upload a logo to the school"
                accept="image"
                disabled={this.props.submitting}
                value={get(this.props.values, 'logoUrl', '')}
                onChange={(key) => this.props.onChange('logoUrl', key)}
                errorText={get(this.props.errors, 'logoUrl', '')}
              />
            </Column>
          </Row>
        )}
        <FormButtons
          confirmLabel={this.props.values.id ? 'Update School' : 'Create School'}
          isDisabled={this.props.submitting || !this.props.isDirty()}
          onReset={this.props.onReset}
        />
      </form>
    )
  }
}

SchoolForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchoolForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default SchoolForm;
