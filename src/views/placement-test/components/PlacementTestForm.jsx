import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Paper from '../../../core/layout/Paper';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={2}>
          <FetchSelect
            url="placement-test-levels"
            fullWidth
            disabled={props.submitting}
            label="Level"
            value={get(props.values, 'placementTestLevel', '')}
            onChange={value => props.onChange('placementTestLevel', value)}
            errorText={get(props.errors, 'placementTestLevel', '')}
            optionsTransformer={placementTestLevel => ({
              label: placementTestLevel.level.toString(),
              value: placementTestLevel.id,
            })}
          />
        </Column>
        <Column lgSize={2}>
          <Select
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Order"
            value={get(props.values, 'order', '')}
            onChange={value => props.onChange('order', value)}
            errorText={get(props.errors, 'order', '')}
            options={range(1, 21).map(value => ({
              value,
              label: value.toString(),
            }))}
          />
        </Column>
        <Column lgSize={8}>
          <FetchSelect
            url="grammars"
            fullWidth
            disabled={props.submitting}
            label="Grammar"
            maxHeight={350}
            value={get(props.values, 'grammar', '')}
            onChange={grammar => props.onChange('grammar', grammar)}
            errorText={get(props.errors, 'grammar', '')}
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
        label={props.values.id ? 'Update' : 'Create'}
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

PlacementTestForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

PlacementTestForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default PlacementTestForm;
