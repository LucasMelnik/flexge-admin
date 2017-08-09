import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import DateInput from '../../../core/form/DateInput';
import FormButtons from '../../../core/form/FormButtons';

const CompanyForm = props => (
  <Card title={props.values.id ? 'Update Company' : 'Create Company'}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <TextInput
        floatingLabel
        fullWidth
        disabled={props.submitting}
        label="Company Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        errorText={get(props.errors, 'name', '')}
      />
      <Row>
        <Column lgSize={4}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="CNPJ"
            value={get(props.values, 'cnpj', '')}
            onChange={value => props.onChange('cnpj', value)}
            errorText={get(props.errors, 'cnpj', '')}
          />
        </Column>
        <Column lgSize={6}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Social Reason"
            value={get(props.values, 'socialReason', '')}
            onChange={value => props.onChange('socialReason', value)}
            errorText={get(props.errors, 'socialReason', '')}
          />
        </Column>
        <Column lgSize={2}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Year of Foundation"
            value={get(props.values, 'foundationYear', '')}
            onChange={value => props.onChange('foundationYear', value)}
            errorText={get(props.errors, 'foundationYear', '')}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled
            label="Country"
            value={get(props.values, 'country', '')}
            onChange={value => props.onChange('country', value)}
            errorText={get(props.errors, 'country', '')}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            fullWidth
            disabled={props.submitting}
            label="State"
            value={get(props.values, 'state', '')}
            onChange={value => props.onChange('state', value)}
            errorText={get(props.errors, 'state', '')}
            options={props.states}
          />
        </Column>
        <Column lgSize={6}>
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
        <Column lgSize={9}>
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
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Phone"
            value={get(props.values, 'phone', '')}
            onChange={value => props.onChange('phone', value)}
            errorText={get(props.errors, 'phone', '')}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={2}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="License Quantity per Package"
            value={get(props.values, 'licenseQuantityPackage', '')}
            onChange={value => props.onChange('licenseQuantityPackage', value)}
            errorText={get(props.errors, 'licenseQuantityPackage', '')}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="License Package Price"
            value={get(props.values, 'licensePricePackage', '')}
            onChange={value => props.onChange('licensePricePackage', value)}
            errorText={get(props.errors, 'licensePricePackage', '')}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Price per Extra License"
            value={get(props.values, 'licensePriceExtra', '')}
            onChange={value => props.onChange('licensePriceExtra', value)}
            errorText={get(props.errors, 'licensePriceExtra', '')}
          />
        </Column>
        <Column lgSize={2}>
          <DateInput
            disabled={props.submitting}
            label="Contract Starts in"
            value={get(props.values, 'contractStart', null)}
            onChange={value => props.onChange('contractStart', value)}
            errorText={get(props.errors, 'contractStart', '')}
          />
        </Column>
        <Column lgSize={2}>
          <DateInput
            disabled={props.submitting}
            label="Contract Ends in"
            value={get(props.values, 'contractEnd', null)}
            onChange={value => props.onChange('contractEnd', value)}
            errorText={get(props.errors, 'contractEnd', '')}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={8}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Subscriber Name"
            value={get(props.values, 'subscriberName', '')}
            onChange={value => props.onChange('subscriberName', value)}
            errorText={get(props.errors, 'subscriberName', '')}
          />
        </Column>
        <Column lgSize={4}>
          <TextInput
            floatingLabel
            fullWidth
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
        disabled={props.submitting || !props.isDirty()}
      />
    </form>
  </Card>
);

CompanyForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

CompanyForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default CompanyForm;
