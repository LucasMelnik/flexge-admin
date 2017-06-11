import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import PermissionValidator from '../../../core/content/PermissionValidator';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const SchoolForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <div className="row">
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="School Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            errorText={get(props.errors, 'name', '')}
          />
        </div>
        <PermissionValidator
          allowedFor={[
            'ADMIN',
            'DISTRIBUTOR_MANAGER'
          ]}
        >
          <div className="col-lg-4">
            <FetchAutoComplete
              url="companies?page=1&size=100"
              fullWidth
              disabled={props.submitting || props.values.id}
              label="Company"
              value={get(props.values, 'company.name', '')}
              onSelect={company => props.onChange('company', company)}
              errorText={get(props.errors, 'company', '')}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </div>
        </PermissionValidator>
        <div className="col-lg-2">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Foundation Year"
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
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update School' : 'Create School'}
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
