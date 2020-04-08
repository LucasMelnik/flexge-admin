import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';
import LocalFileInput from '../../../core/form/LocalFileInput';
import ColorInput from '../../../core/form/ColorInput';

const WhitelabelConfigForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <TextInput
          required
          disabled={props.submitting}
          label="Domain"
          value={get(props.values, 'domain', '')}
          onChange={value => props.onChange('domain', value)}
          errorText={get(props.errors, 'domain', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required
          disabled={props.submitting}
          label="Title"
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', null)}
        />
      </Column>
      <Column size={2}>
        <TextInput
          required
          disabled={props.submitting}
          label="Support Email"
          value={get(props.values, 'supportEmail', '')}
          onChange={value => props.onChange('supportEmail', value)}
          errorText={get(props.errors, 'supportEmail', null)}
        />
      </Column>
      <Column size={3}>
        <FetchSelect
          url="distributors"
          required={true}
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
      <Column size={3}>
        <FetchSelect
          url="companies"
          required={true}
          isPaginated={true}
          showSearch={true}
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
      <Column size={2}>
        <LocalFileInput
          disabled={props.submitting}
          label="Logo"
          value={get(props.values, 'logoUrl', '')}
          onChange={value => props.onChange('logo', value)}
          errorText={get(props.errors, 'logo', null)}
          accept="image"
        />
      </Column>
      <Column size={2}>
        <LocalFileInput
          disabled={props.submitting}
          label="White Logo"
          value={get(props.values, 'whiteLogoUrl', '')}
          onChange={value => props.onChange('whiteLogo', value)}
          errorText={get(props.errors, 'whiteLogo', null)}
          accept="image"
        />
      </Column>
      <Column size={2}>
        <LocalFileInput
          disabled={props.submitting}
          label="Kids Logo"
          value={get(props.values, 'kidsLogoUrl', '')}
          onChange={value => props.onChange('kidsLogo', value)}
          errorText={get(props.errors, 'kidsLogo', null)}
          accept="image"
        />
      </Column>
      <Column size={2}>
        <LocalFileInput
          disabled={props.submitting}
          label="Favicon"
          value={get(props.values, 'favIconUrl', '')}
          onChange={value => props.onChange('favicon', value)}
          errorText={get(props.errors, 'favicon', null)}
          accept="image"
        />
      </Column>
    </Row>
    <Row>
      <Column size={3}>
        <ColorInput
          required
          disabled={props.submitting}
          label="Primary Color"
          value={get(props.values, 'primaryColor', '')}
          onChange={value => props.onChange('primaryColor', value)}
          errorText={get(props.errors, 'primaryColor', null)}
        />
      </Column>
      <Column size={3}>
        <ColorInput
          required
          disabled={props.submitting}
          label="Secondary Color"
          value={get(props.values, 'secondaryColor', '')}
          onChange={value => props.onChange('secondaryColor', value)}
          errorText={get(props.errors, 'secondaryColor', null)}
        />
      </Column>
      <Column size={3}>
        <ColorInput
          required
          disabled={props.submitting}
          label="Light Color"
          value={get(props.values, 'lightColor', '')}
          onChange={value => props.onChange('lightColor', value)}
          errorText={get(props.errors, 'lightColor', null)}
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
