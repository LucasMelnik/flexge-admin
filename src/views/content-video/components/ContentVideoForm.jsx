import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import Select from '../../../core/form/Select';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import LocalFileInput from '../../../core/form/LocalFileInput';

const ContentVideoForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={4}>
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER]}>
        <Column size={8}>
          <FetchSelect
            showSearch
            url="/companies"
            required
            multiple
            isPaginated
            disabled={props.submitting}
            label="Companies"
            value={get(props.values, 'companies', [])}
            onChange={(value) => props.onChange('companies', value)}
            errorText={get(props.errors, 'companies', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </PermissionValidator>
    </Row>
    <Row>
      <Column size={2.5}>
        <FetchSelect
          showSearch
          required
          url="/courses"
          disabled={props.submitting}
          label="Course"
          value={get(props.values, 'course')}
          onChange={value => props.onChange('course', value)}
          errorText={get(props.errors, 'course', '')}
          resultFilter={c => c.name.toLowerCase() !== 'adventures' && c.name.toLowerCase() !== 'discovery'}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          required
          showSearch
          url="approved-modules"
          label="Module"
          params={{course: props.values.course}}
          disabled={props.submitting || !props.values.course}
          value={get(props.values, 'module', '')}
          onChange={module => {
            props.onChange('module', module);
            props.onChange('group', null);
            props.onReloadGroups(module);
          }}
          errorText={get(props.errors, 'module', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <Select
          required
          options={props.availableModuleGroups}
          disabled={props.submitting || !props.values.course || !props.values.module}
          label="Position"
          value={get(props.values, 'group', '')}
          onChange={value => props.onChange('group', value)}
          errorText={get(props.errors, 'group', '')}
        />
      </Column>
      {!props.values.videoId && (
        <Column size={3.5}>
          <LocalFileInput
            label="Video"
            accept="video"
            value={get(props.values, 'video', null)}
            onChange={(value) => {
              props.onChange('videoFileSize', value.size);
              props.onChange('video', value);
            }}
            errorText={get(props.errors, 'video', null)}
          />
        </Column>
      )}
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Content Video' : 'Create Content Video'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ContentVideoForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  onReloadGroups: PropTypes.func,
  availableModuleGroups: PropTypes.array,
};

ContentVideoForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ContentVideoForm;
