import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import DateInput from '../../../core/form/DateInput';
import Select from '../../../core/form/Select';
import ImagePicker from '../../../core/form/ImagePicker';

const ProfileForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={1}>
        <ImagePicker
          src={get(props.values, 'profilePicture', '')}
          onConfirmChanges={blob => props.onChangePicture(blob)}
        />
      </Column>
      <Column size={6}>
        <div style={{ height: 19 }} />
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <TextInput
          required
          disabled={props.submitting}
          label="Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', null)}
        />
      </Column>
      <Column size={1}>
        <DateInput
          disabled={props.submitting}
          label="Birthdate"
          value={get(props.values, 'birthDate', undefined)}
          onChange={value => props.onChange('birthDate', value)}
          errorText={get(props.errors, 'birthDate', null)}
        />
      </Column>
      <Column size={1}>
        <Select
          disabled={props.submitting}
          label="Gender"
          value={get(props.values, 'gender', undefined)}
          onChange={value => props.onChange('gender', value)}
          errorText={get(props.errors, 'gender', null)}
          options={[
            {
              label: 'Male',
              value: 'M',
            },
            {
              label: 'Female',
              value: 'F',
            },
          ]}
        />
      </Column>
    </Row>
    <Row>
      <p>You can change your password, you just need to type your current password and the new desired password.</p>
      <Column size={2}>
        <TextInput
          type="password"
          disabled={props.submitting}
          label="Password"
          value={get(props.values, 'password', '')}
          onChange={(value) => {
            props.onChange('password', value);
            props.onChange('newPassword', null);
          }}
          errorText={get(props.errors, 'password', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          type="password"
          disabled={props.submitting || !get(props.values, 'password', false)}
          label="New Password"
          value={get(props.values, 'newPassword', '')}
          onChange={value => props.onChange('newPassword', value)}
          errorText={get(props.errors, 'newPassword', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Profile' : 'Create Profile'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

ProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  onChangePicture: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

ProfileForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default ProfileForm;
