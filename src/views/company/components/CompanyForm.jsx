import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import DateInput from '../../../core/form/DateInput';
import FormButtons from '../../../core/form/FormButtons';
import MaskInput from '../../../core/form/MaskInput';
import FetchSelect from '../../../core/form/FetchSelect';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const CompanyForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={localStorage.role === 'ADMIN' ? 8 : 12}>
        <TextInput
          disabled={props.submitting}
          label="Company Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
          required
        />
      </Column>
      <PermissionValidator allowedFor={['ADMIN']}>
        <Column size={4}>
          <FetchSelect
            url="/distributors"
            required
            disabled={props.submitting || props.disableDistributor}
            label="Distributor"
            value={get(props.values, 'distributor', '')}
            onChange={(distributor) => {
              props.onChange('distributor', distributor);
            }}
            errorText={get(props.errors, 'distributor', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
    </Row>
    <Row>
      <Column size={4}>
        <TextInput
          disabled={props.submitting}
          label="CNPJ"
          value={get(props.values, 'cnpj', '')}
          onChange={value => props.onChange('cnpj', value)}
          errorText={get(props.errors, 'cnpj', '')}
        />
      </Column>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="Social Reason"
          value={get(props.values, 'socialReason', '')}
          onChange={value => props.onChange('socialReason', value)}
          errorText={get(props.errors, 'socialReason', '')}
        />
      </Column>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="Year of Foundation"
          value={get(props.values, 'foundationYear', '')}
          onChange={value => props.onChange('foundationYear', value)}
          errorText={get(props.errors, 'foundationYear', '')}
          blocks={[4]}
          numericOnly
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <FetchSelect
          url="countries"
          disabled={props.submitting}
          label="Country"
          value={get(props.values, 'country', '')}
          onChange={country => props.onChange('country', country)}
          errorText={get(props.errors, 'country', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      {(get(props.values, 'country', '') === '5a01ff39898e1571b5d5172b') && (
        <Column size={3}>
          <Select
            disabled={props.submitting}
            label="State"
            value={get(props.values, 'state', '')}
            onChange={value => props.onChange('state', value)}
            errorText={get(props.errors, 'state', '')}
            options={props.states}
            required
          />
        </Column>
      )}
      <Column size={6}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="City"
          value={get(props.values, 'city', '')}
          onChange={value => props.onChange('city', value)}
          errorText={get(props.errors, 'city', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={9}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Address"
          value={get(props.values, 'address', '')}
          onChange={value => props.onChange('address', value)}
          errorText={get(props.errors, 'address', '')}
        />
      </Column>
      <Column size={3}>
        <MaskInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Phone"
          value={get(props.values, 'phone', '')}
          onChange={value => props.onChange('phone', value)}
          errorText={get(props.errors, 'phone', '')}
          maskType="phone"
        />
      </Column>
    </Row>
    <Row>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="License Qty per Pack"
          value={get(props.values, 'licenseQuantityPackage', '')}
          onChange={value => props.onChange('licenseQuantityPackage', value)}
          errorText={get(props.errors, 'licenseQuantityPackage', '')}
          blocks={[99]}
          numericOnly
        />
      </Column>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="License Package Price"
          value={get(props.values, 'licensePricePackage', '')}
          onChange={value => props.onChange('licensePricePackage', value)}
          errorText={get(props.errors, 'licensePricePackage', '')}
          maskType="numeral"
        />
      </Column>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="Price per Extra License"
          value={get(props.values, 'licensePriceExtra', '')}
          onChange={value => props.onChange('licensePriceExtra', value)}
          errorText={get(props.errors, 'licensePriceExtra', '')}
          maskType="numeral"
        />
      </Column>
      <Column size={2}>
        <DateInput
          disabled={props.submitting}
          label="Contract Starts in"
          value={get(props.values, 'contractStart', null)}
          onChange={value => props.onChange('contractStart', value)}
          errorText={get(props.errors, 'contractStart', '')}
        />
      </Column>
      <Column size={2}>
        <DateInput
          disabled={props.submitting}
          label="Contract Ends in"
          value={get(props.values, 'contractEnd', null)}
          onChange={value => props.onChange('contractEnd', value)}
          errorText={get(props.errors, 'contractEnd', '')}
        />
      </Column>
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
    </Row>
    <Row>
      <Column size={8}>
        <TextInput
          disabled={props.submitting}
          label="Subscriber Name"
          value={get(props.values, 'subscriberName', '')}
          onChange={value => props.onChange('subscriberName', value)}
          errorText={get(props.errors, 'subscriberName', '')}
        />
      </Column>
      <Column size={4}>
        <TextInput
          disabled={props.submitting}
          label="Subscriber Post"
          value={get(props.values, 'subscriberPost', '')}
          onChange={value => props.onChange('subscriberPost', value)}
          errorText={get(props.errors, 'subscriberPost', '')}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Company' : 'Create Company'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CompanyForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disableDistributor: PropTypes.bool,
  isDirty: PropTypes.func,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CompanyForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disableDistributor: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CompanyForm;
