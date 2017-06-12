import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import PermissionValidator from '../../../core/content/PermissionValidator';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const TeacherForm = props => (
  <Paper>
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
            label="Teacher Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            errorText={get(props.errors, 'name', '')}
          />
        </div>
        <div className="col-lg-3">
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Email"
            value={get(props.values, 'email', '')}
            onChange={value => props.onChange('email', value)}
            errorText={get(props.errors, 'email', '')}
          />
        </div>
        <PermissionValidator
          allowedFor={[
            'ADMIN',
            'DISTRIBUTOR_MANAGER'
          ]}
        >
          <div className="col-lg-3">
            <FetchAutoComplete
              url="companies?page=1&size=100"
              fullWidth
              disabled={props.submitting}
              label="Company"
              value={get(props.values, 'company.name', '')}
              onSelect={company => props.onChange('company', company)}
              errorText={get(props.errors, 'company', '')}
              resultTransformer={{
                text: 'name',
                value: 'id',
              }}
            />
          </div>
        </PermissionValidator>
      </div>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Teacher' : 'Create Teacher'}
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

TeacherForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

TeacherForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default TeacherForm;
