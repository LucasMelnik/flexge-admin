import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import PermissionValidator from '../../../../core/content/PermissionValidator';
import Card from '../../../core/layout/Card';
import FetchSelect from '../../../core/form/FetchSelect';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';

const TeacherForm = props => (
  <Card
    title={props.values.id ? 'Update Teacher' : 'Create Teacher'}
    actions={
      (
        <Button
          icon="fa-arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.push('/v2/teachers')}
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
          <Column lgSize={3}>
            <TextInput
              disabled={props.submitting}
              label="Teacher Name"
              value={get(props.values, 'name', '')}
              onChange={value => props.onChange('name', value)}
              description={get(props.errors, 'name', null)}
              fieldValidation={get(props.errors, 'name', null) && 'error'}
            />
          </Column>
          <Column lgSize={3}>
            <TextInput
              disabled={props.submitting}
              label="Email"
              value={get(props.values, 'email', '')}
              onChange={value => props.onChange('email', value)}
              description={get(props.errors, 'email', null)}
              fieldValidation={get(props.errors, 'email', null) && 'error'}
            />
          </Column>
          <Column lgSize={3}>
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
          <PermissionValidator
            allowedFor={[
              'ADMIN',
              'DISTRIBUTOR_MANAGER',
            ]}
          >
            <Column lgSize={3}>
              <FetchSelect
                url="/companies"
                fullWidth
                disabled={props.submitting}
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
        </Row>
        <Row>
          {get(props.values, 'company', '') && (
            <Column lgSize={3}>
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
          )}
        </Row>
        <div style={{ marginBottom: 20 }} />
        <FormButtons
          confirmLabel={props.values.id ? 'Update Teacher' : 'Create Teacher'}
          isDisabled={props.submitting || !props.isDirty()}
          onReset={props.onReset}
        />
      </form>
    </Async>
  </Card>
);

TeacherForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

TeacherForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default TeacherForm;
