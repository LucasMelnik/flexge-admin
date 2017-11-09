import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FileInput from '../../../core/form/FileInput';
import Select from '../../../core/form/Select';

const AchievementForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={8}>
        <TextInput
          disabled={props.submitting}
          label="Achievement Description"
          value={get(props.values, 'description', '')}
          onChange={value => props.onChange('description', value)}
          description={get(props.errors, 'description', null)}
          fieldValidation={get(props.errors, 'description', null) && 'error'}
        />
      </Column>
      <Column lgSize={4}>
        <FileInput
          label="Achievement Icon"
          accept="image"
          value={get(props.values, 'icon', '')}
          onChange={key => props.onChange('icon', key)}
          errorText={get(props.errors, 'icon', '')}
        />
      </Column>
    </Row>
    <Row>
      <Column lgSize={4}>
        <Select
          label="Achievement Type"
          value={get(props.values, 'type', '')}
          onChange={value => props.onChange('type', value)}
          description={get(props.errors, 'type', null)}
          fieldValidation={get(props.errors, 'type', null) && 'error'}
          options={['TOP_10_MONTHLY', 'TOP_10_SEMESTER', 'TOP_10_YEAR'].map(type => ({
            label: type,
            value: type,
          }))}
        />
      </Column>
      <Column lgSize={4}>
        <Select
          label="Achievement Level"
          value={get(props.values, 'level', '')}
          onChange={value => props.onChange('level', value)}
          description={get(props.errors, 'level', null)}
          fieldValidation={get(props.errors, 'level', null) && 'error'}
          options={['STUDENT', 'SCHOOL', 'REGIONAL', 'NATIONAL'].map(type => ({
            label: type,
            value: type,
          }))}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Achievement' : 'Create Achievement'}
      isDisabled={props.submitting || !props.isDirty()}
      onReset={props.onReset}
    />
  </form>
);

AchievementForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

AchievementForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default AchievementForm;
