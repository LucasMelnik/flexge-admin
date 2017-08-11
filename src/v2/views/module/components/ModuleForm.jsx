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

const ModuleForm = props => (
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
            label="Module Name"
            value={get(props.values, 'name', '')}
            onChange={value => props.onChange('name', value)}
            description={get(props.errors, 'name', '')}
            fieldValidation={get(props.errors, 'name', null) && 'error'}
          />
        </Column>
        <Column lgSize={6}>
          <TextInput
            disabled={props.submitting}
            label="Module Description"
            value={get(props.values, 'description', '')}
            onChange={value => props.onChange('description', value)}
            description={get(props.errors, 'description', '')}
            fieldValidation={get(props.errors, 'description', null) && 'error'}
            fieldType="textarea"
          />
        </Column>
      </Row>
      <Row>
        <Column lgSize={3}>
          <FetchSelect
            url="courses"
            disabled={props.submitting}
            label="Course"
            value={get(props.values, 'course', '')}
            onChange={course => props.onChange('course', course)}
            description={get(props.errors, 'course', '')}
            fieldValidation={get(props.errors, 'course', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={3}>
          <FetchSelect
            url="academic-plans"
            disabled={props.submitting}
            label="Academic Plan"
            value={get(props.values, 'academicPlan', '')}
            onChange={academicPlan => props.onChange('academicPlan', academicPlan)}
            description={get(props.errors, 'academicPlan', '')}
            fieldValidation={get(props.errors, 'academicPlan', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            options={['A', 'B', 'C'].map(value => ({
              value,
              label: value
            }))}
            disabled={props.submitting}
            label="Group"
            value={get(props.values, 'group', '')}
            onChange={value => props.onChange('group', value)}
            description={get(props.errors, 'group', '')}
            fieldValidation={get(props.errors, 'group', null) && 'error'}
          />
        </Column>
        <Column lgSize={3}>
          <Select
            options={range(1, 21).map(value => ({
              value,
              label: value.toString(),
            }))}
            disabled={props.submitting}
            label="Order"
            value={get(props.values, 'order', '')}
            onChange={value => props.onChange('order', value)}
            description={get(props.errors, 'order', '')}
            fieldValidation={get(props.errors, 'order', null) && 'error'}
          />
        </Column>
      </Row>
      <Separator size="md" />
      <FormButtons
        confirmLabel={props.values.id ? 'Update Module' : 'Create Module'}
        isDisabled={props.submitting || !props.isDirty()}
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
  onChange: () => false,
};

export default ModuleForm;
