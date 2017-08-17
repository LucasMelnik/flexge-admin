import React from 'react';
import PropTypes from 'prop-types';
import PermissionValidator from '../../../../core/content/PermissionValidator';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import MaskInput from '../../../core/form/MaskInput';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';

const SchoolDetailForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={6}>
        <TextInput
          disabled
          label="School Name"
          value={get(props.values, 'name', '')}
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
            disabled
            label="Company"
            value={get(props.values, 'company', '')}
            onChange={company => props.onChange('company', company)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
      <Column lgSize={2}>
        <MaskInput
          disabled
          label="Foundation Year"
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
          disabled
          label="City"
          value={get(props.values, 'city', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={9}>
        <TextInput
          disabled
          label="Address"
          value={get(props.values, 'address', '')}
        />
      </Column>
      <Column lgSize={3}>
        <MaskInput
          disabled
          label="Phone"
          value={get(props.values, 'phone', '')}
          maskType="phone"
        />
      </Column>
    </Row>
  </form>
);

SchoolDetailForm.propTypes = {
  values: PropTypes.object,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchoolDetailForm.defaultProps = {
  values: {},
};

export default SchoolDetailForm;
