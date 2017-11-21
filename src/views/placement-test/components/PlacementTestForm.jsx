import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const PlacementTestForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <FetchSelect
          url="placement-test-levels?query[level][$ne]=5.5"
          fullWidth
          disabled={props.submitting}
          label="Level"
          value={get(props.values, 'placementTestLevel', '')}
          onChange={value => props.onChange('placementTestLevel', value)}
          errorText={get(props.errors, 'placementTestLevel', '')}
          resultTransformer={{
            text: 'level',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
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
      <Column size={6}>
        <FetchSelect
          url="grammars"
          fullWidth
          disabled={props.submitting}
          label="Grammar"
          maxHeight={350}
          value={get(props.values, 'grammar', '')}
          onChange={grammar => props.onChange('grammar', grammar)}
          errorText={get(props.errors, 'grammar', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <Select
          floatingLabel
          fullWidth
          disabled={props.submitting || localStorage.role !== 'ADMIN'}
          label="Items to Show"
          value={get(props.values, 'itemsToShow', '')}
          onChange={value => props.onChange('itemsToShow', value)}
          errorText={get(props.errors, 'itemsToShow', '')}
          options={range(1, get(props.values, 'items.length', 10) + 1).map(value => ({
            value,
            label: value.toString(),
          }))}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Grammar' : 'Create Grammar'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
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
};

export default PlacementTestForm;
