import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const StudentForm = props => (
  <Card>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <div className="row">
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Student Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            error={get(props.errors, 'name', '')}
          />
        </div>
        <div className="col-lg-6">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Student Email"
            value={get(props.values, 'email', '')}
            onChange={value => props.onChange('email', value)}
            error={get(props.errors, 'email', '')}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <FetchAutoComplete
            url="companies?page=1&size=100"
            fullWidth
            disabled={props.submitting}
            label="Company"
            value={get(props.values, 'company', '')}
            onSelect={company => props.onChange('company', company.id)}
            error={get(props.errors, 'company', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </div>
      </div>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Student' : 'Create Student'}
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
  </Card>
);

StudentForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

StudentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default StudentForm;
