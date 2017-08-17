import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import PermissionValidator from '../../../../core/content/PermissionValidator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import FormButtons from '../../../core/form/FormButtons';

const SchoolClassForm = props => (
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
          label="Class Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          description={get(props.errors, 'name', null)}
          fieldValidation={get(props.errors, 'name', null) && 'error'}
        />
      </Column>
      <PermissionValidator
        allowedFor={[
          'ADMIN',
          'DISTRIBUTOR_MANAGER',
        ]}
      >
        <Column lgSize={4}>
          <FetchSelect
            url="/teachers"
            disabled={props.submitting}
            label="Teacher"
            value={get(props.values, 'teacher', '')}
            onChange={teacher => props.onChange('teacher', teacher)}
            description={get(props.errors, 'teacher', null)}
            fieldValidation={get(props.errors, 'teacher', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
      <PermissionValidator
        allowedFor={[
          'ADMIN',
          'DISTRIBUTOR_MANAGER',
        ]}
      >
        <Column lgSize={4}>
          <FetchSelect
            url="/schools"
            disabled
            label="School"
            value={get(props.values, 'school', '')}
            onChange={school => props.onChange('school', school)}
            description={get(props.errors, 'school', null)}
            fieldValidation={get(props.errors, 'school', null) && 'error'}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update School Class' : 'Create School Class'}
      isDisabled={props.submitting || !props.isDirty()}
      onReset={props.onReset}
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
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchoolClassForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default SchoolClassForm;
