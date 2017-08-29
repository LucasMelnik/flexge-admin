import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import FormButtons from '../../../core/form/FormButtons';

const ManagerForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={4}>
        <TextInput
          disabled={props.submitting}
          label="Manager Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          description={get(props.errors, 'name', '')}
          fieldValidation={get(props.errors, 'name', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          disabled={props.submitting}
          label="Manager Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          description={get(props.errors, 'email', '')}
          fieldValidation={get(props.errors, 'email', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          disabled={props.submitting}
          type="password"
          label="Manager Password"
          value={get(props.values, 'password', '')}
          onChange={value => props.onChange('password', value)}
          description={get(props.errors, 'password', '')}
          fieldValidation={get(props.errors, 'password', null) && 'error'}
        />
      </Column>
    </Row>
    <Separator size="xs" />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Manager' : 'Create Manager'}
      isDisabled={props.submitting || !props.isDirty()}
      onReset={props.onReset}
    />
  </form>
);

ManagerForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ManagerForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default ManagerForm;
