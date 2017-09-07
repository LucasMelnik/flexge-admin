import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';
import Select from '../../../core/form/Select';

const ItemTypeForm = props => (
  <Async fetching={props.submitting}>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={3}>
          <TextInput
            disabled={props.submitting}
            label="Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            description={get(props.errors, 'name', null)}
            fieldValidation={get(props.errors, 'name', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            disabled={!!get(props.values, 'id', null) || props.submitting}
            label="Key"
            value={get(props.values, 'key', '')}
            onChange={value => props.onChange('key', value)}
            description={get(props.errors, 'key', null)}
            fieldValidation={get(props.errors, 'key', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
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
        <Column lgSize={3}>
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
        <Column lgSize={12}>
          <TextInput
            disabled={props.submitting}
            label="Description"
            value={get(props.values, 'description', '')}
            onChange={value => props.onChange('description', value)}
            description={get(props.errors, 'description', null)}
            fieldValidation={get(props.errors, 'description', null) && 'error'}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={4}>
          <TextInput
            type="number"
            label="Time"
            disabled={props.submitting}
            value={get(props.values, 'defaultTime', '')}
            onChange={value => props.onChange('defaultTime', value)}
            description={get(props.errors, 'defaultTime', '')}
            fieldValidation={get(props.errors, 'defaultTime', null) && 'error'}
          />
        </Column>
        <Column lgSize={4}>
          <TextInput
            type="number"
            label="Placement Time"
            disabled={props.submitting}
            value={get(props.values, 'defaultPlacementTestTime', '')}
            onChange={value => props.onChange('defaultPlacementTestTime', value)}
            description={get(props.errors, 'defaultPlacementTestTime', '')}
            fieldValidation={get(props.errors, 'defaultPlacementTestTime', null) && 'error'}
          />
        </Column>
        <Column lgSize={4}>
          <TextInput
            type="number"
            label="Mastery Time"
            disabled={props.submitting}
            value={get(props.values, 'defaultMasteryTestTime', '')}
            onChange={value => props.onChange('defaultMasteryTestTime', value)}
            description={get(props.errors, 'defaultMasteryTestTime', '')}
            fieldValidation={get(props.errors, 'defaultMasteryTestTime', null) && 'error'}
          />
        </Column>
      </Row>
      <FormButtons
        confirmLabel={props.values.id ? 'Update ItemType' : 'Create ItemType'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Async>
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
  onChange: () => false,
  onReset: () => false,
};

export default ItemTypeForm;
