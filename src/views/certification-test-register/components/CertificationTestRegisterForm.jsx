import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const CertificationTestRegisterForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <FetchSelect
          required
          showSearch
          url="courses"
          disabled={props.submitting}
          label="Course"
          value={get(props.values, 'course', '')}
          onChange={value => props.onChange('course', value)}
          errorText={get(props.errors, 'course', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
          resultFilter={course => course.name.indexOf('+') < 0 && course.name.toLowerCase().indexOf('pre') < 0}
        />
      </Column>
      <Column size={2}>
        <Select
          required
          disabled={props.submitting}
          placeholder="Select..."
          label="Ability"
          value={get(props.values, 'ability', '')}
          onChange={value => props.onChange('ability', value)}
          errorText={get(props.errors, 'ability', '')}
          options={[
            { value: 'READING', label: 'Reading' },
            { value: 'WRITING', label: 'Writing' },
            { value: 'SPEAKING', label: 'Speaking' },
            { value: 'LISTENING', label: 'Listening' },
          ]}
        />
      </Column>
      <Column size={2}>
        <Select
          required
          disabled={props.submitting}
          label="Order"
          placeholder="Select..."
          value={get(props.values, 'order', '')}
          onChange={value => props.onChange('order', value)}
          errorText={get(props.errors, 'order', '')}
          options={range(1, 21).map(value => ({
            value,
            label: value.toString(),
          }))}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          showSearch
          url="grammars"
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
          placeholder="Select..."
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
      confirmLabel={props.values.id ? 'Update Certification Test' : 'Create Certification Test'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CertificationTestRegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CertificationTestRegisterForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CertificationTestRegisterForm;
