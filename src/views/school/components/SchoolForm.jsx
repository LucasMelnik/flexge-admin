import React from 'react';
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

const SchoolForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <TextInput
          required
          disabled={props.submitting}
          label="School Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <PermissionValidator
        allowedFor={[
          'ADMIN',
          'DISTRIBUTOR_MANAGER',
        ]}
      >
        <Column size={4}>
          <FetchSelect
            url="/companies"
            required
            disabled={props.submitting || props.disableCompany}
            label="Company"
            value={get(props.values, 'company', '')}
            onChange={(company) => {
              props.onChange('company', company);
            }}
            errorText={get(props.errors, 'company', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
              country: 'country',
            }}
          />
        </Column>
      </PermissionValidator>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="Foundation Year"
          value={get(props.values, 'foundationYear', '')}
          onChange={value => props.onChange('foundationYear', value)}
          errorText={get(props.errors, 'foundationYear', null)}
          blocks={[4]}
          numericOnly
        />
      </Column>
    </Row>
    <Row>
      <Column size={2}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Demo Limit"
          value={get(props.values, 'demoStudentLimit', '')}
          onChange={value => props.onChange('demoStudentLimit', value)}
          errorText={get(props.errors, 'demoStudentLimit', null)}
        />
      </Column>
      <Column size={2}>
        <FetchSelect
          url={`regions${props.values.company ? `?query[company]=${get(props.values, 'company', '')}` : ''}`}
          fullWidth
          disabled={props.submitting || !get(props.values, 'company', '')}
          label="Region"
          value={get(props.values, 'region', '')}
          onChange={value => props.onChange('region', value)}
          errorText={get(props.errors, 'region', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <Select
          disabled={props.submitting}
          label="State"
          value={get(props.values, 'state', '')}
          onChange={value => props.onChange('state', value)}
          errorText={get(props.errors, 'state', '')}
          options={props.states}
        />
      </Column>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="City"
          value={get(props.values, 'city', '')}
          onChange={value => props.onChange('city', value)}
          errorText={get(props.errors, 'city', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={9}>
        <TextInput
          disabled={props.submitting}
          label="Address"
          value={get(props.values, 'address', '')}
          onChange={value => props.onChange('address', value)}
          errorText={get(props.errors, 'address', null)}
        />
      </Column>
      <Column size={3}>
        <MaskInput
          disabled={props.submitting}
          label="Phone"
          value={get(props.values, 'phone', '')}
          onChange={value => props.onChange('phone', value)}
          errorText={get(props.errors, 'phone', null)}
          maskType="phone"
        />
      </Column>
    </Row>
    {get(props.values, 'id', '') && (
      <Row>
        <Column size={4}>
          <FileInput
            label="Upload a logo to the school"
            accept="image"
            disabled={props.submitting}
            value={get(props.values, 'logoUrl', '')}
            onChange={(key) => props.onChange('logoUrl', key)}
            errorText={get(props.errors, 'logoUrl', '')}
          />
        </Column>
      </Row>
    )}
    <FormButtons
      confirmLabel={props.values.id ? 'Update School' : 'Create School'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

SchoolForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disableCompany: PropTypes.bool,
  isDirty: PropTypes.func,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchoolForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disableCompany: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default SchoolForm;
