import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import Card from '../../../core/layout/Card';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';

const UserForm = props => (
  <Card
    title={props.values.id ? 'Update User' : 'Create User'}
    actions={
      (
        <Button
          icon="fa-arrow-left"
          label="Back"
          type="default"
          onClick={() => props.roleUser === 'ADMIN' ? browserHistory.push('/admin-users') : props.roleUser === 'DISTRIBUTOR_MANAGER' ? browserHistory.push('/distributor-users') : browserHistory.push('/admin-users')}
        />
      )
    }
  >
    <Async fetching={props.submitting}>
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
              label="User Name"
              value={get(props.values, 'name', '')}
              onChange={value => props.onChange('name', value)}
              description={get(props.errors, 'name', null)}
              fieldValidation={get(props.errors, 'name', null) && 'error'}
            />
          </Column>
          <Column lgSize={4}>
            <TextInput
              disabled={props.submitting}
              label="Email"
              value={get(props.values, 'email', '')}
              onChange={value => props.onChange('email', value)}
              description={get(props.errors, 'email', null)}
              fieldValidation={get(props.errors, 'email', null) && 'error'}
            />
          </Column>
          <Column lgSize={4}>
            <TextInput
              type="password"
              disabled={props.submitting}
              label="Password"
              value={get(props.values, 'password', '')}
              onChange={value => props.onChange('password', value)}
              description={get(props.errors, 'password', null)}
              fieldValidation={get(props.errors, 'password', null) && 'error'}
            />
          </Column>
        </Row>
        <Row>
          <PermissionValidator
            allowedFor={[
              'ADMIN',
              'DISTRIBUTOR_MANAGER',
            ]}
          >
            <Column lgSize={4}>
              <Select
                disabled={props.submitting}
                label="Role"
                value={get(props.values, 'role', '')}
                onChange={value => props.onChange('role', value)}
                description={get(props.errors, 'role', '')}
                fieldValidation={get(props.errors, 'role', null) && 'error'}
                options={
                props.roleUser === 'ADMIN' ? (
                [
                  { value: 'ADMIN', label: 'Admin' },
                  { value: 'CONTENT_ADMIN', label: 'Content Admin' },
                  { value: 'IMAGE_ADMIN', label: 'Image Admin' },
                  { value: 'AUDIO_CONTENT', label: 'Content Audio' },
                ]
              ) : props.roleUser === 'DISTRIBUTOR_MANAGER' ? (
              [
                { value: 'DISTRIBUTOR_MANAGER', label: 'Distributor Manager' },
              ]
              ) : (
              [
                { value: 'SCHOOL_MANAGER', label: 'School Manager' },
                { value: 'COMPANY_MANAGER', label: 'Company Manager' },
                { value: 'TEACHER', label: 'Teacher' },
              ]
                )}
              />
            </Column>
          </PermissionValidator>
          {(get(props.values, 'role', '') === 'SCHOOL_MANAGER' || get(props.values, 'role', '') === 'COMPANY_MANAGER' || get(props.values, 'role', '') === 'TEACHER') && (
            <div>
              <PermissionValidator
                allowedFor={[
                  'ADMIN',
                  'CONTENT_ADMIN',
                  'DISTRIBUTOR_MANAGER',
                ]}
              >
                <Column lgSize={4}>
                  <FetchSelect
                    url="/companies"
                    fullWidth
                    disabled
                    label="Company"
                    value={get(props.values, 'company', '')}
                    onChange={(company) => {
                      props.onChange('company', company);
                    }}
                    description={get(props.errors, 'company', null)}
                    fieldValidation={get(props.errors, 'company', null) && 'error'}
                    resultTransformer={{
                      text: 'name',
                      value: 'id',
                    }}
                  />
                </Column>
              </PermissionValidator>

              {get(props.values, 'role', '') !== 'COMPANY_MANAGER' && (
                <PermissionValidator
                  allowedFor={[
                    'ADMIN',
                    'DISTRIBUTOR_MANAGER',
                  ]}
                >
                  <Column lgSize={4}>
                    <FetchSelect
                      url={`/schools?query[company]=${get(props.values, 'company', '')}`}
                      fullWidth
                      disabled={props.submitting || !get(props.values, 'company', '')}
                      label="Schools"
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
              )}
            </div>
          )}
        </Row>
        <div style={{ marginBottom: 20 }} />
        <FormButtons
          confirmLabel={props.values.id ? 'Update User' : 'Create User'}
          isDisabled={props.submitting || !props.isDirty()}
          onReset={props.onReset}
        />
      </form>
    </Async>
  </Card>
);

UserForm.propTypes = {
  roleUser: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

UserForm.defaultProps = {
  roleUser: null,
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default UserForm;
