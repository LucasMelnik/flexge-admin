import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const UnitForm = props => (
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
            label="Unit Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            error={get(props.errors, 'name', '')}
          />
        </div>
        <div className="col-lg-6">
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
        </div>
      </div>
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
