import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';

const CharacterForm = props => (
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
      </Row>
      <FormButtons
        confirmLabel={props.values.id ? 'Update Character' : 'Create Character'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Async>
);

CharacterForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CharacterForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default CharacterForm;