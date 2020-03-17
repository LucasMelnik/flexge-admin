import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import get from 'lodash/get';
import startsWith from 'lodash/startsWith';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';
import LocaleSelect from '../../../core/form/LocaleSelect';

const CountryForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={5}>
        <TextInput
          required
          disabled={props.submitting}
          label="Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <Column size={4}>
        <Select
          required
          showSearch
          label="Timezone"
          filterOption={(value, option) => startsWith(option.props.children.toLowerCase(), value.toLowerCase())}
          disabled={props.submitting}
          value={get(props.values, 'timezone', '')}
          onChange={value => props.onChange('timezone', value)}
          options={moment.tz.names().map(timezone => ({
            label: timezone,
            value: timezone,
          }))}
        />
      </Column>
      <Column size={1.5}>
        <TextInput
          required
          disabled={props.submitting}
          label="Code"
          value={get(props.values, 'code', '')}
          onChange={value => props.onChange('code', value)}
          errorText={get(props.errors, 'code', null)}
        />
      </Column>
      <Column size={1.5}>
        <LocaleSelect
          required
          disabled={props.submitting}
          value={get(props.values, 'locale', '')}
          onChange={value => props.onChange('locale', value)}
          errorText={get(props.errors, 'locale', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Country' : 'Create Country'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

CountryForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CountryForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default CountryForm;
