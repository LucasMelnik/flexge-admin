import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Paper from '../../../../core/layout/Paper';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';
import Select from '../../../../core/form/Select';
import FetchAutoComplete from '../../../../core/form/FetchAutoComplete';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const UnitForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={4}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Unit Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            error={get(props.errors, 'name', '')}
          />
        </Column>
        <Column lgSize={4}>
          <FetchAutoComplete
            url="modules?page=1&size=100"
            fullWidth
            disabled
            label="Module"
            value={get(props.values, 'module.name', '')}
            onSelect={module => props.onChange('module', module)}
            error={get(props.errors, 'module', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={4}>
          <FetchAutoComplete
            url="unit-types?page=1&size=100"
            fullWidth
            disabled={props.submitting}
            label="Unit Type"
            value={get(props.values, 'type.name', '')}
            onSelect={type => props.onChange('type', type)}
            errorText={get(props.errors, 'type', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={2}>
          <Select
            floatingLabel
            fullWidth
            options={range(1, 11).map(value => ({
              value,
              label: value.toString(),
            }))}
            disabled={props.submitting}
            label="Order"
            value={get(props.values, 'order', '')}
            onChange={value => props.onChange('order', value)}
            error={get(props.errors, 'order', '')}
          />
        </Column>
        <Column lgSize={2}>
          <Select
            floatingLabel
            fullWidth
            options={range(1, 11).map(value => ({
              value,
              label: value.toString(),
            }))}
            disabled={props.submitting}
            label="Group"
            value={get(props.values, 'group', '')}
            onChange={value => props.onChange('group', value)}
            error={get(props.errors, 'group', '')}
          />
        </Column>
        <Column lgSize={2}>
          <Select
            floatingLabel
            fullWidth
            options={range(70, 105, 5).map(value => ({
              value,
              label: value.toString(),
            }))}
            disabled={props.submitting}
            label="Score to pass"
            value={get(props.values, 'scoreToPass', '')}
            onChange={value => props.onChange('scoreToPass', value)}
            error={get(props.errors, 'scoreToPass', '')}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            floatingLabel
            fullWidth
            options={range(1, 21).map(value => ({
              value,
              label: value.toString(),
            }))}
            disabled={props.submitting}
            label="Time (minutes)"
            value={get(props.values, 'time', '')}
            onChange={value => props.onChange('time', value)}
            error={get(props.errors, 'time', '')}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: 'EASY', value: 'EASY' },
              { label: 'MODERATE', value: 'MODERATE' },
              { label: 'HARD', value: 'HARD' },
            ]}
            disabled={props.submitting}
            label="Difficulty"
            value={get(props.values, 'difficulty', '')}
            onChange={value => props.onChange('difficulty', value)}
            error={get(props.errors, 'difficulty', '')}
          />
        </Column>
      </Row>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Unit' : 'Create Unit'}
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

UnitForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UnitForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default UnitForm;
