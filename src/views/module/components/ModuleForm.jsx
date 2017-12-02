import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';
import FormButtons from '../../../core/form/FormButtons';
import FileInput from '../../../core/form/FileInput';

const ModuleForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="Module Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', '')}
        />
      </Column>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="Module Description"
          value={get(props.values, 'description', '')}
          onChange={value => props.onChange('description', value)}
          errorText={get(props.errors, 'description', '')}
          fieldType="textarea"
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <FetchSelect
          url="courses"
          disabled={props.submitting}
          label="Course"
          value={get(props.values, 'course', '')}
          onChange={course => props.onChange('course', course)}
          errorText={get(props.errors, 'course', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          url="academic-plans"
          disabled={props.submitting}
          label="Academic Plan"
          value={get(props.values, 'academicPlan', '')}
          onChange={academicPlan => props.onChange('academicPlan', academicPlan)}
          errorText={get(props.errors, 'academicPlan', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <Select
          options={['A', 'B', 'C', 'D'].map(value => ({
            value,
            label: value,
          }))}
          disabled={props.submitting}
          label="Group"
          value={get(props.values, 'group', '')}
          onChange={value => props.onChange('group', value)}
          errorText={get(props.errors, 'group', '')}
        />
      </Column>
      <Column size={3}>
        <Select
          options={range(1, 21).map(value => ({
            value,
            label: value.toString(),
          }))}
          disabled={props.submitting}
          label="Order"
          value={get(props.values, 'order', '')}
          onChange={value => props.onChange('order', value)}
          errorText={get(props.errors, 'order', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          disabled={props.submitting}
          label="Education Goal"
          value={get(props.values, 'educationGoal', '')}
          onChange={value => props.onChange('educationGoal', value)}
          errorText={get(props.errors, 'educationGoal', '')}
          fieldType="textarea"
        />
      </Column>
    </Row>
    {get(props.values, 'id', '') && (
      <Row>
        <Column size={12}>
          <FileInput
            label="Upload a background image"
            accept="image"
            disabled={props.submitting}
            value={get(props.values, 'backgroundUrl', '')}
            onChange={key => props.onChange('backgroundUrl', key)}
            errorText={get(props.errors, 'backgroundUrl', '')}
          />
        </Column>
      </Row>
    )}
    <Separator size="md" />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Module' : 'Create Module'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
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
};

export default ModuleForm;
