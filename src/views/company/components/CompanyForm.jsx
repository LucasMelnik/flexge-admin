import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import DatePicker from '../../../core/form/DatePicker';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const CompanyForm = props => (
  <Paper>
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
      <div className="row">
        <div className="col-lg-4">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="CNPJ"
            value={get(props.values, 'cnpj', '')}
            onChange={value => props.onChange('cnpj', value)}
            errorText={get(props.errors, 'cnpj', '')}
          />
        </div>
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Social Reason"
            value={get(props.values, 'socialReason', '')}
            onChange={value => props.onChange('socialReason', value)}
            errorText={get(props.errors, 'socialReason', '')}
          />
        </div>
        <div className="col-lg-2">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Year of Foundation"
            value={get(props.values, 'foundationYear', '')}
            onChange={value => props.onChange('foundationYear', value)}
            errorText={get(props.errors, 'foundationYear', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled
            label="Country"
            value={get(props.values, 'country', '')}
            onChange={value => props.onChange('country', value)}
            errorText={get(props.errors, 'country', '')}
          />
        </div>
        <div className="col-lg-3">
          <Select
            fullWidth
            disabled={props.submitting}
            label="State"
            value={get(props.values, 'state', '')}
            onChange={value => props.onChange('state', value)}
            errorText={get(props.errors, 'state', '')}
            options={props.states}
          />
        </div>
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="City"
            value={get(props.values, 'city', '')}
            onChange={value => props.onChange('city', value)}
            errorText={get(props.errors, 'city', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Address"
            value={get(props.values, 'address', '')}
            onChange={value => props.onChange('address', value)}
            errorText={get(props.errors, 'address', '')}
          />
        </div>
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Phone"
            value={get(props.values, 'phone', '')}
            onChange={value => props.onChange('phone', value)}
            errorText={get(props.errors, 'phone', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="License Quantity per Package"
            value={get(props.values, 'licenseQuantityPackage', '')}
            onChange={value => props.onChange('licenseQuantityPackage', value)}
            errorText={get(props.errors, 'licenseQuantityPackage', '')}
          />
        </div>
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="License Package Price"
            value={get(props.values, 'licensePricePackage', '')}
            onChange={value => props.onChange('licensePricePackage', value)}
            errorText={get(props.errors, 'licensePricePackage', '')}
          />
        </div>
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Price per Extra License"
            value={get(props.values, 'licensePriceExtra', '')}
            onChange={value => props.onChange('licensePriceExtra', value)}
            errorText={get(props.errors, 'licensePriceExtra', '')}
          />
        </div>
        <div className="col-lg-3">
          <DatePicker
            fullWidth
            disabled={props.submitting}
            label="Contract Starts in"
            value={get(props.values, 'contractFrom', null)}
            onChange={value => props.onChange('contractFrom', value)}
            errorText={get(props.errors, 'contractFrom', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Subscriber Name"
            value={get(props.values, 'subscriberName', '')}
            onChange={value => props.onChange('subscriberName', value)}
            errorText={get(props.errors, 'subscriberName', '')}
          />
        </div>
        <div className="col-lg-4">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Subscriber Post"
            value={get(props.values, 'subscriberPost', '')}
            onChange={value => props.onChange('subscriberPost', value)}
            errorText={get(props.errors, 'subscriberPost', '')}
          />
        </div>
      </div>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Company' : 'Create Company'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        onClick={props.onReset}
        label="Discard changes"
      />
    </form>
  </Paper>
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
