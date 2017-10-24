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
import Async from '../../../core/layout/Async';
import FetchSelect from '../../../core/form/FetchSelect';

const CompanyForm = props => (
  <Async fetching={props.submitting}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <TextInput
        disabled={props.submitting}
        label="Company Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        description={get(props.errors, 'name', null)}
        fieldValidation={get(props.errors, 'name', null) && 'error'}
      />
      <Row>
        <Column lgSize={4}>
          <MaskInput
            disabled={props.submitting}
            label="CNPJ"
            value={get(props.values, 'cnpj', '')}
            onChange={value => props.onChange('cnpj', value)}
            description={get(props.errors, 'cnpj', '')}
            fieldValidation={get(props.errors, 'cnpj', null) && 'error'}
            delimiters={['.', '.', '/', '-']}
            blocks={[2, 3, 3, 4, 2]}
            numericOnly
          />
        </Column>
        <Column lgSize={6}>
          <TextInput
            disabled={props.submitting}
            label="Social Reason"
            value={get(props.values, 'socialReason', '')}
            onChange={value => props.onChange('socialReason', value)}
            description={get(props.errors, 'socialReason', '')}
            fieldValidation={get(props.errors, 'socialReason', null) && 'error'}
          />
        </Column>
        <Column lgSize={2}>
          <MaskInput
            disabled={props.submitting}
            label="Year of Foundation"
            value={get(props.values, 'foundationYear', '')}
            onChange={value => props.onChange('foundationYear', value)}
            description={get(props.errors, 'foundationYear', '')}
            fieldValidation={get(props.errors, 'foundationYear', null) && 'error'}
            blocks={[4]}
            numericOnly
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={3}>
          <FetchSelect
            url="countries"
            disabled={props.submitting}
            label="Country"
            value={get(props.values, 'country', '')}
            onChange={country => props.onChange('country', country)}
            description={get(props.errors, 'country', '')}
            fieldValidation={get(props.errors, 'country', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            disabled={props.submitting}
            label="State"
            value={get(props.values, 'state', '')}
            onChange={value => props.onChange('state', value)}
            description={get(props.errors, 'state', '')}
            options={props.states}
            fieldValidation={get(props.errors, 'state', null) && 'error'}
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
            description={get(props.errors, 'city', '')}
            fieldValidation={get(props.errors, 'city', null) && 'error'}
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
            description={get(props.errors, 'address', '')}
            fieldValidation={get(props.errors, 'address', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <MaskInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Phone"
            value={get(props.values, 'phone', '')}
            onChange={value => props.onChange('phone', value)}
            description={get(props.errors, 'phone', '')}
            fieldValidation={get(props.errors, 'phone', null) && 'error'}
            maskType="phone"
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={2}>
          <MaskInput
            disabled={props.submitting}
            label="License Qty per Pack"
            value={get(props.values, 'licenseQuantityPackage', '')}
            onChange={value => props.onChange('licenseQuantityPackage', value)}
            description={get(props.errors, 'licenseQuantityPackage', '')}
            fieldValidation={get(props.errors, 'licenseQuantityPackage', null) && 'error'}
            blocks={[99]}
            numericOnly
          />
        </Column>
        <Column lgSize={3}>
          <MaskInput
            disabled={props.submitting}
            label="License Package Price"
            value={get(props.values, 'licensePricePackage', '')}
            onChange={value => props.onChange('licensePricePackage', value)}
            description={get(props.errors, 'licensePricePackage', '')}
            fieldValidation={get(props.errors, 'licensePricePackage', null) && 'error'}
            maskType="numeral"
          />
        </Column>
        <Column lgSize={3}>
          <MaskInput
            disabled={props.submitting}
            label="Price per Extra License"
            value={get(props.values, 'licensePriceExtra', '')}
            onChange={value => props.onChange('licensePriceExtra', value)}
            description={get(props.errors, 'licensePriceExtra', '')}
            fieldValidation={get(props.errors, 'licensePriceExtra', null) && 'error'}
            maskType="numeral"
          />
        </Column>
        <Column lgSize={2}>
          <DateInput
            disabled={props.submitting}
            label="Contract Starts in"
            value={get(props.values, 'contractStart', null)}
            onChange={value => props.onChange('contractStart', value)}
            description={get(props.errors, 'contractStart', '')}
            fieldValidation={get(props.errors, 'contractStart', null) && 'error'}
          />
        </Column>
        <Column lgSize={2}>
          <DateInput
            disabled={props.submitting}
            label="Contract Ends in"
            value={get(props.values, 'contractEnd', null)}
            onChange={value => props.onChange('contractEnd', value)}
            description={get(props.errors, 'contractEnd', '')}
            fieldValidation={get(props.errors, 'contractEnd', null) && 'error'}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={8}>
          <TextInput
            disabled={props.submitting}
            label="Subscriber Name"
            value={get(props.values, 'subscriberName', '')}
            onChange={value => props.onChange('subscriberName', value)}
            description={get(props.errors, 'subscriberName', '')}
            fieldValidation={get(props.errors, 'subscriberName', null) && 'error'}
          />
        </Column>
        <Column lgSize={4}>
          <TextInput
            disabled={props.submitting}
            label="Subscriber Post"
            value={get(props.values, 'subscriberPost', '')}
            onChange={value => props.onChange('subscriberPost', value)}
            description={get(props.errors, 'subscriberPost', '')}
            fieldValidation={get(props.errors, 'subscriberPost', null) && 'error'}
          />
        </Column>
      </Row>
      <FormButtons
        confirmLabel={props.values.id ? 'Update Company' : 'Create Company'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Async>
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
