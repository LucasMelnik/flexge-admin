import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const CompanyApiKeyForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={12}>
        <TextInput
          disabled
          placeholder="Generate the new api key"
          label="Api Key"
          value={get(props.values, 'key', '')}
          onChange={value => props.onChange('key', value)}
        />
      </Column>
    </Row>
    <Button
      icon="key"
      type="primary"
      disabled={props.submitting}
      loading={props.submitting}
      buttonType="submit"
      label="Generate Api Key"
    />
  </form>
);

CompanyApiKeyForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

CompanyApiKeyForm.defaultProps = {
  values: {},
  submitting: false,
  onSubmit: () => alert('submitted'),
};

export default CompanyApiKeyForm;
