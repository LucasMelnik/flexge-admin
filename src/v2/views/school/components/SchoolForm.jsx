import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import PermissionValidator from '../../../../core/content/PermissionValidator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import MaskInput from '../../../core/form/MaskInput';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import FormButtons from '../../../core/form/FormButtons';

const SchoolForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={6}>
        <TextInput
          disabled={props.submitting}
          label="School Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          description={get(props.errors, 'name', null)}
          fieldValidation={get(props.errors, 'name', null) && 'error'}
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
            disabled={props.submitting}
            label="Company"
            value={get(props.values, 'company', '')}
            onChange={company => props.onChange('company', company)}
            description={get(props.errors, 'company', null)}
            fieldValidation={get(props.errors, 'company', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
      <Column lgSize={2}>
        <MaskInput
          disabled={props.submitting}
          label="Foundation Year"
          value={get(props.values, 'foundationYear', '')}
          onChange={value => props.onChange('foundationYear', value)}
          description={get(props.errors, 'foundationYear', null)}
          fieldValidation={get(props.errors, 'foundationYear', null) && 'error'}
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
          onChange={value => props.onChange('country', value)}
          description={get(props.errors, 'country', null)}
          fieldValidation={get(props.errors, 'country', null) && 'error'}
        />
      </Column>
      <Column lgSize={3}>
        <Select
          disabled={props.submitting}
          label="State"
          value={get(props.values, 'state', '')}
          onChange={value => props.onChange('state', value)}
          description={get(props.errors, 'state', '')}
          fieldValidation={get(props.errors, 'state', null) && 'error'}
          options={props.states}
        />
      </Column>
      <Column lgSize={6}>
        <TextInput
          disabled={props.submitting}
          label="City"
          value={get(props.values, 'city', '')}
          onChange={value => props.onChange('city', value)}
          description={get(props.errors, 'city', null)}
          fieldValidation={get(props.errors, 'city', null) && 'error'}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={9}>
        <TextInput
          disabled={props.submitting}
          label="Address"
          value={get(props.values, 'address', '')}
          onChange={value => props.onChange('address', value)}
          description={get(props.errors, 'address', null)}
          fieldValidation={get(props.errors, 'address', null) && 'error'}
        />
      </Column>
      <Column lgSize={3}>
        <MaskInput
          disabled={props.submitting}
          label="Phone"
          value={get(props.values, 'phone', '')}
          onChange={value => props.onChange('phone', value)}
          description={get(props.errors, 'phone', null)}
          fieldValidation={get(props.errors, 'phone', null) && 'error'}
          maskType="phone"
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update School' : 'Create School'}
      isDisabled={props.submitting || !props.isDirty()}
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
