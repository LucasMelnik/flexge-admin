import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';

const ItemTypeForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          disabled={!!get(props.values, 'id', null) || props.submitting}
          label="Key"
          value={get(props.values, 'key', '')}
          onChange={value => props.onChange('key', value)}
          errorText={get(props.errors, 'key', null)}
        />
      </Column>
      <Column size={3}>
        <Select
          disabled={props.submitting}
          label="Allowed for Placement"
          value={get(props.values, 'allowedForPlacementTest', false)}
          onChange={value => props.onChange('allowedForPlacementTest', value)}
          options={[
            { value: false, label: 'No' },
            { value: true, label: 'Yes' },
          ]}
        />
      </Column>
      <Column size={3}>
        <Select
          disabled={props.submitting}
          label="Allowed for Mastery"
          value={get(props.values, 'allowedForMasteryTest', false)}
          onChange={value => props.onChange('allowedForMasteryTest', value)}
          options={[
            { value: false, label: 'No' },
            { value: true, label: 'Yes' },
          ]}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          disabled={props.submitting}
          label="Description"
          value={get(props.values, 'description', '')}
          onChange={value => props.onChange('description', value)}
          errorText={get(props.errors, 'description', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        <TextInput
          type="number"
          label="Unit Time"
          disabled={props.submitting}
          value={get(props.values, 'defaultTime', '')}
          onChange={value => props.onChange('defaultTime', value)}
          errorText={get(props.errors, 'defaultTime', '')}
        />
      </Column>
      <Column size={4}>
        <TextInput
          type="number"
          label="Placement Time"
          disabled={props.submitting}
          value={get(props.values, 'defaultPlacementTestTime', '')}
          onChange={value => props.onChange('defaultPlacementTestTime', value)}
          errorText={get(props.errors, 'defaultPlacementTestTime', '')}
        />
      </Column>
      <Column size={4}>
        <TextInput
          type="number"
          label="Mastery Time"
          disabled={props.submitting}
          value={get(props.values, 'defaultMasteryTestTime', '')}
          onChange={value => props.onChange('defaultMasteryTestTime', value)}
          errorText={get(props.errors, 'defaultMasteryTestTime', '')}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update ItemType' : 'Create ItemType'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ItemTypeForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ItemTypeForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ItemTypeForm;
