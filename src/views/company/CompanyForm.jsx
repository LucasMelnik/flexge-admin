import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Block from 'jsxstyle/Block';
import Card from '../../core/layout/Card';
import TextInput from '../../core/form/TextInput';
import Button from '../../core/form/Button';
import Separator from '../../core/layout/Separator';
import CompanyManager from './CompanyManager';

const CompanyForm = props => (
  <div>
    <Card>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit();
        }}
      >
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Company Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          error={get(props.errors, 'name', '')}
        />
        <Separator size="xs" />
        <Button
          icon="done"
          colored
          fullWidth
          disabled={props.submitting || !props.isDirty()}
          type="submit"
          label={props.values.id ? 'Update Company' : 'Create Company'}
        />
        <Separator size="xs" />
        <Button
          icon="clear"
          fullWidth
          disabled={props.submitting}
          onClick={() => browserHistory.push('/companies')}
          label="Cancel"
        />
      </form>
    </Card>
    <Block marginTop={20}>
      <CompanyManager />
    </Block>
  </div>
);

CompanyForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CompanyForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
};

export default CompanyForm;
