import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import LocalFileInput from '../../../core/form/LocalFileInput';
import Select from '../../../core/form/Select';

const WhitelabelConfigForm = props => (
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
          label="Domain"
          value={get(props.values, 'domain', '')}
          onChange={value => props.onChange('domain', value)}
          errorText={get(props.errors, 'domain', null)}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          url="distributors"
          disabled={props.submitting || !!props.values.company}
          label="Distributor"
          value={get(props.values, 'distributor', '')}
          onChange={distributor => props.onChange('distributor', distributor)}
          errorText={get(props.errors, 'distributor', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          url="companies"
          disabled={props.submitting || !!props.values.distributor}
          label="Company"
          value={get(props.values, 'company', '')}
          onChange={company => props.onChange('company', company)}
          errorText={get(props.errors, 'company', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <Row>
      {!props.values.id && (
        <Column size={6}>
          <Select
            multiple
            disabled={props.submitting}
            label="Apps to configure"
            value={get(props.values, 'cloudfrontDistributions', [])}
            onChange={value => props.onChange('cloudfrontDistributions', value)}
            options={[
              { value: 'ADMIN', label: 'Admin' },
              { value: 'STUDENT', label: 'Student' },
              { value: 'KIDS', label: 'Kids' },
            ]}
          />
        </Column>
      )}
      <Column size={3}>
        <TextInput
          required
          disabled={props.submitting}
          label="Title"
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          required
          disabled={props.submitting}
          label="Color"
          value={get(props.values, 'color', '')}
          onChange={value => props.onChange('color', value)}
          errorText={get(props.errors, 'color', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <LocalFileInput
          disabled={props.submitting}
          label="Logo"
          value={get(props.values, 'logoUrl', '')}
          onChange={value => props.onChange('logo', value)}
          errorText={get(props.errors, 'logo', null)}
          accept="image"
        />
      </Column>
      <Column size={3}>
        <LocalFileInput
          disabled={props.submitting}
          label="Favicon"
          value={get(props.values, 'favIconUrl', '')}
          onChange={value => props.onChange('favicon', value)}
          errorText={get(props.errors, 'favicon', null)}
          accept="image"
        />
      </Column>
      <Column size={3}>
        <LocalFileInput
          disabled={props.submitting}
          label="iOS Icon"
          value={get(props.values, 'iosIconUrl', '')}
          onChange={value => props.onChange('iosIcon', value)}
          errorText={get(props.errors, 'iosIcon', null)}
          accept="image"
        />
      </Column>
      <Column size={3}>
        <LocalFileInput
          disabled={props.submitting}
          label="Android Icon"
          value={get(props.values, 'androidIconUrl', '')}
          onChange={value => props.onChange('androidIcon', value)}
          errorText={get(props.errors, 'androidIcon', null)}
          accept="image"
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Whitelabel Config' : 'Create Whitelabel Config'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

WhitelabelConfigForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

WhitelabelConfigForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default WhitelabelConfigForm;
