import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import Select from '../../../core/form/Select';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';

const UnitForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={6}>
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
        <Column lgSize={6}>
          <FetchAutoComplete
            url="modules?page=1&size=100"
            fullWidth
            disabled={props.submitting}
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
      </Row>
      <Row>
        <Column lgSize={3}>
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
            ]}
            disabled={props.submitting}
            label="Order"
            value={get(props.values, 'order', '')}
            onChange={value => props.onChange('order', value)}
            error={get(props.errors, 'order', '')}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            floatingLabel
            fullWidth
            options={[
              { label: '70', value: 70 },
              { label: '75', value: 75 },
              { label: '80', value: 80 },
              { label: '85', value: 85 },
              { label: '90', value: 90 },
              { label: '95', value: 95 },
              { label: '100', value: 100 },
            ]}
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
            options={[
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 },
              { label: '7', value: 7 },
              { label: '8', value: 8 },
              { label: '9', value: 9 },
              { label: '10', value: 10 },
              { label: '11', value: 11 },
              { label: '12', value: 12 },
              { label: '13', value: 13 },
              { label: '14', value: 14 },
              { label: '15', value: 15 },
              { label: '16', value: 16 },
              { label: '17', value: 17 },
              { label: '18', value: 18 },
              { label: '19', value: 19 },
              { label: '20', value: 20 },
            ]}
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
