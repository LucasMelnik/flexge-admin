import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import FileInput from '../../../core/form/FileInput';
import Select from '../../../core/form/Select';
import Switch from '../../../core/form/Switch';
import Separator from '../../../core/layout/Separator';
import AchievementIconFormContainer from './AchievementIconFormContainer';

const AchievementForm = props => (
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
          label="Achievement Description"
          value={get(props.values, 'description', '')}
          onChange={value => props.onChange('description', value)}
          errorText={get(props.errors, 'description', null)}
        />
      </Column>
      <Column size={3}>
        <Select
          required
          label="Achievement Type"
          disabled={props.submitting}
          value={get(props.values, 'type', '')}
          onChange={value => props.onChange('type', value)}
          errorText={get(props.errors, 'type', null)}
          options={['TOP_10_MONTHLY', 'TOP_10_SEMESTER', 'TOP_10_YEAR'].map(type => ({
            label: type,
            value: type,
          }))}
        />
      </Column>
      <Column size={3}>
        <Select
          required
          label="Achievement Level"
          disabled={props.submitting}
          value={get(props.values, 'level', '')}
          onChange={value => props.onChange('level', value)}
          errorText={get(props.errors, 'level', null)}
          options={['STUDENT', 'SCHOOL', 'REGIONAL', 'NATIONAL'].map(type => ({
            label: type,
            value: type,
          }))}
        />
      </Column>
    </Row>
    <Row>
      <Column size={4}>
        <Switch
          label="Achievement Icon Type"
          titleOff="Icon to Achievement"
          titleOn="Icons by Position"
          onChange={(value) => {
            props.onChange('manyIcons', value);
            props.onChange('icon', undefined);
            props.onChange('iconByPosition', undefined);
          }}
          value={get(props.values, 'manyIcons', false)}
          disabled={props.submitting}
        />
      </Column>
    </Row>
    <Row>
      {!get(props.values, 'manyIcons', false) ? (
        <Column size={4}>
          <FileInput
            label="Achievement Icon"
            accept="image"
            disabled={props.submitting}
            value={get(props.values, 'icon', '')}
            onChange={key => props.onChange('icon', key)}
            errorText={get(props.errors, 'icon', '')}
          />
        </Column>
      ) : (
        <Column size={12}>
          <AchievementIconFormContainer
            onChange={icons => props.onChange('iconByPosition', icons)}
            icons={get(props.values, 'iconByPosition', [])}
          />
        </Column>
      )}
    </Row>
    <Separator />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Achievement' : 'Create Achievement'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
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
};

export default AchievementForm;
