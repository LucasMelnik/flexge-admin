import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const SchoolClassForm = props => (
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
          label="Class Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          error={get(props.errors, 'name', '')}
        />
      </div>
      <div className="col-lg-6">
        <FetchAutoComplete
          url="teachers?page=1&size=100"
          fullWidth
          disabled={props.submitting}
          label="Teacher"
          value={get(props.values, 'teacher', '')}
          onSelect={teacher => props.onChange('teacher', teacher.id)}
          error={get(props.errors, 'teacher', '')}
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
      label={props.values.id ? 'Update Class' : 'Create Class'}
    />
    <Separator size="xs" />
    <Button
      icon="clear"
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      onClick={props.onReset}
      label="Discard Changes"
    />
  </form>
);

SchoolClassForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

SchoolClassForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default SchoolClassForm;
