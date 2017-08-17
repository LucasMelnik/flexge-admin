import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import DateInput from '../../../core/form/DateInput';
import MaskInput from '../../../core/form/MaskInput';
import Async from '../../../core/layout/Async';

const CompanyForm = props => (
  <Async fetching={props.submitting}>
    <TextInput
      disabled
      label="Company Name"
      value={get(props.values, 'name', '')}
    />
    <Row>
      <Column lgSize={4}>
        <MaskInput
          disabled
          label="CNPJ"
          value={get(props.values, 'cnpj', '')}
          delimiters={['.', '.', '/', '-']}
          blocks={[2, 3, 3, 4, 2]}
          numericOnly
        />
      </Column>
      <Column lgSize={6}>
        <TextInput
          disabled
          label="Social Reason"
          value={get(props.values, 'socialReason', '')}
        />
      </Column>
      <Column lgSize={2}>
        <MaskInput
          disabled
          label="Year of Foundation"
          value={get(props.values, 'foundationYear', '')}
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
          value={get(props.values, 'country', '')}
        />
      </Column>
      <Column lgSize={3}>
        <Select
          disabled
          label="State"
          value={get(props.values, 'state', '')}
          options={props.states}
        />
      </Column>
      <Column lgSize={6}>
        <TextInput
          floatingLabel
          fullWidth
          disabled
          label="City"
          value={get(props.values, 'city', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={9}>
        <TextInput
          floatingLabel
          fullWidth
          disabled
          label="Address"
          value={get(props.values, 'address', '')}
        />
      </Column>
      <Column lgSize={3}>
        <MaskInput
          floatingLabel
          fullWidth
          disabled
          label="Phone"
          value={get(props.values, 'phone', '')}
          maskType="phone"
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={2}>
        <MaskInput
          disabled
          label="License Qty per Pack"
          value={get(props.values, 'licenseQuantityPackage', '')}
          blocks={[99]}
          numericOnly
        />
      </Column>
      <Column lgSize={3}>
        <MaskInput
          disabled
          label="License Package Price"
          value={get(props.values, 'licensePricePackage', '')}
          maskType="numeral"
        />
      </Column>
      <Column lgSize={3}>
        <MaskInput
          disabled
          label="Price per Extra License"
          value={get(props.values, 'licensePriceExtra', '')}
          maskType="numeral"
        />
      </Column>
      <Column lgSize={2}>
        <DateInput
          disabled
          label="Contract Starts in"
          value={get(props.values, 'contractStart', null)}
        />
      </Column>
      <Column lgSize={2}>
        <DateInput
          disabled
          label="Contract Ends in"
          value={get(props.values, 'contractEnd', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={8}>
        <TextInput
          disabled
          label="Subscriber Name"
          value={get(props.values, 'subscriberName', '')}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          disabled
          label="Subscriber Post"
          value={get(props.values, 'subscriberPost', '')}
        />
      </Column>
    </Row>
  </Async>
);

CompanyForm.propTypes = {
  values: PropTypes.object,
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
