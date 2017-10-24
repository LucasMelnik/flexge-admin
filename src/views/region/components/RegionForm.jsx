import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';
import FetchSelect from '../../../core/form/FetchSelect';

const RegionForm = props => (
  <Async fetching={props.submitting}>
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
            label="Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            description={get(props.errors, 'name', null)}
            fieldValidation={get(props.errors, 'name', null) && 'error'}
          />
        </Column>
        <Column lgSize={6}>
          <FetchSelect
            url="countries"
            disabled={props.submitting}
            label="Country"
            value={get(props.values, 'country', '')}
            onChange={country => props.onChange('country', country)}
            description={get(props.errors, 'country', '')}
            fieldValidation={get(props.errors, 'country', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </Row>
      <FormButtons
        confirmLabel={props.values.id ? 'Update Region' : 'Create Region'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Async>
);

RegionForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

RegionForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default RegionForm;
