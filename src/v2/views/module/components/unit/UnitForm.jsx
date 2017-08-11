import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import TextInput from '../../../../core/form/TextInput';
import Separator from '../../../../core/layout/Separator';
import Select from '../../../../core/form/Select';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FormButtons from '../../../../core/form/FormButtons';
import FetchSelect from '../../../../core/form/FetchSelect';

const UnitForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={4}>
        <TextInput
          disabled={props.submitting || props.disabled}
          label="Unit Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          description={get(props.errors, 'name', '')}
          fieldValidation={get(props.errors, 'name', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <FetchSelect
          url="modules"
          disabled
          label="Module"
          value={get(props.values, 'module', '')}
          onChange={module => props.onChange('module', module)}
          description={get(props.errors, 'module', '')}
          fieldValidation={get(props.errors, 'module', null) && 'error'}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column lgSize={4}>
        <FetchSelect
          url="unit-types"
          disabled={props.submitting || props.disabled}
          label="Unit Type"
          value={get(props.values, 'type', '')}
          onChange={type => props.onChange('type', type)}
          description={get(props.errors, 'type', '')}
          fieldValidation={get(props.errors, 'type', null) && 'error'}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={3}>
        <Select
          options={['A', 'B', 'C'].map(value => ({
            value,
            label: value
          }))}
          disabled={props.submitting || props.disabled}
          label="Group"
          value={get(props.values, 'group', '')}
          onChange={value => props.onChange('group', value)}
          description={get(props.errors, 'group', '')}
          fieldValidation={get(props.errors, 'group', null) && 'error'}
        />
      </Column>
      <Column lgSize={3}>
        <Select
          options={range(1, 41).map(value => ({
            value,
            label: value.toString(),
          }))}
          disabled={props.submitting || props.disabled}
          label="Order"
          value={get(props.values, 'order', '')}
          onChange={value => props.onChange('order', value)}
          description={get(props.errors, 'order', '')}
          fieldValidation={get(props.errors, 'order', null) && 'error'}
        />
      </Column>
      <Column lgSize={3}>
        <Select
          options={range(70, 105, 5).map(value => ({
            value,
            label: value.toString(),
          }))}
          disabled={props.submitting || props.disabled}
          label="Score to pass"
          value={get(props.values, 'scoreToPass', '')}
          onChange={value => props.onChange('scoreToPass', value)}
          description={get(props.errors, 'scoreToPass', '')}
          fieldValidation={get(props.errors, 'scoreToPass', null) && 'error'}
        />
      </Column>
      <Column lgSize={3}>
        <Select
          options={[
            { label: 'EASY', value: 'EASY' },
            { label: 'MODERATE', value: 'MODERATE' },
            { label: 'HARD', value: 'HARD' },
          ]}
          disabled={props.submitting || props.disabled}
          label="Difficulty"
          value={get(props.values, 'difficulty', '')}
          onChange={value => props.onChange('difficulty', value)}
          description={get(props.errors, 'difficulty', '')}
          fieldValidation={get(props.errors, 'difficulty', null) && 'error'}
        />
      </Column>
    </Row>
    <Separator size="xs" />
    {!props.disabled && (
      <FormButtons
        confirmLabel={props.values.id ? 'Update Module' : 'Create Module'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    )}
  </form>
);

UnitForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  disabled: PropTypes.bool,
};

UnitForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
  disabled: false,
};

export default UnitForm;
