import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const ModuleForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Module Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            errorText={get(props.errors, 'name', '')}
          />
        </Column>
        <Column lgSize={3}>
          <TextInput
            floatingLabel
            fullWidth
            disabled={props.submitting}
            label="Module Description"
            value={get(props.values, 'description', '')}
            onChange={value => props.onChange('description', value)}
            errorText={get(props.errors, 'description', '')}
          />
        </Column>
        <Column lgSize={3}>
          <FetchAutoComplete
            url="courses?page=1&size=100"
            fullWidth
            disabled={props.submitting}
            label="Course"
            value={get(props.values, 'course.name', '')}
            onSelect={course => props.onChange('course', course)}
            errorText={get(props.errors, 'course', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={3}>
          <FetchAutoComplete
            url="academic-plans?page=1&size=100"
            fullWidth
            disabled={props.submitting}
            label="Academic Plan"
            value={get(props.values, 'academicPlan.name', '')}
            onSelect={academicPlan => props.onChange('academicPlan', academicPlan)}
            errorText={get(props.errors, 'academicPlan', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
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
        label={props.values.id ? 'Update Module' : 'Create Module'}
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

ModuleForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ModuleForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default ModuleForm;
