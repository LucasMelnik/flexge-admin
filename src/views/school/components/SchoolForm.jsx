import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import round from 'lodash/round';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import MaskInput from '../../../core/form/MaskInput';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';
import FormButtons from '../../../core/form/FormButtons';
import FileInput from '../../../core/form/FileInput';
import Switch from '../../../core/form/Switch';
import LocaleSelect from '../../../core/form/LocaleSelect';
import { MASTERTEST_DISTRIBUTOR_ID } from '../../../core/consts';
import { Roles } from '../../../core/util';

const SchoolForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={6}>
        <TextInput
          required
          disabled={props.submitting}
          label="School Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
        <Column size={4}>
          <FetchSelect
            showSearch
            url="/companies"
            required
            isPaginated
            disabled={props.submitting || props.disableCompany}
            label="Company"
            value={get(props.values, 'company', '')}
            onChange={(company, object) => {
              props.onChange('company', company);
              props.onChange('country', get(object, 'country', null));
              props.onChange('companyDistributor', get(object, 'distributor', null));
              props.onChange('locale', get(object, 'country.locale', null));
            }}
            errorText={get(props.errors, 'company', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
              country: 'country',
            }}
          />
        </Column>
      </PermissionValidator>
      <Column size={2}>
        <MaskInput
          disabled={props.submitting}
          label="Foundation Year"
          value={get(props.values, 'foundationYear', '')}
          onChange={value => props.onChange('foundationYear', value)}
          errorText={get(props.errors, 'foundationYear', null)}
          blocks={[4]}
          numericOnly
        />
      </Column>
    </Row>
    <Row>
      <Column size={2}>
        <FetchSelect
          showSearch
          url="/regions"
          params={{
            ...get(props.values, 'company', false) && {
              query: {
                company: get(props.values, 'company', '')
              },
            },
          }}
          fullWidth
          required
          disabled={props.submitting || !get(props.values, 'company', '')}
          label="Region"
          value={get(props.values, 'region', '')}
          onChange={value => props.onChange('region', value)}
          errorText={get(props.errors, 'region', null)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <FetchSelect
          required
          showSearch
          url="states"
          params={{
            country: get(props.values, 'country.id', props.values.country) || props.companyCountry
          }}
          disabled={props.submitting || !get(props.values, 'company', false)}
          label="State"
          value={get(props.values, 'state', '')}
          onChange={state => props.onChange('state', state)}
          errorText={get(props.errors, 'state', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <LocaleSelect
          required
          disabled={props.submitting || !get(props.values, 'company', false)}
          value={get(props.values, 'locale', '')}
          onChange={value => props.onChange('locale', value)}
          errorText={get(props.errors, 'locale', null)}
        />
      </Column>
      <Column size={4}>
        <Select
          multiple
          disabled={props.submitting}
          label="Required student info"
          value={get(props.values, 'requiredStudentFields', [])}
          onChange={value => props.onChange('requiredStudentFields', value)}
          options={[
            { label: 'Email', value: 'email' },
            { label: 'Name', value: 'name' },
            { label: 'Birth date', value: 'birthDate' },
            { label: 'Phone', value: 'contactPhone' },
          ]}
        />
      </Column>
      <Column size={2}>
        <TextInput
          type="number"
          disabled={props.submitting}
          label="Demo Limit"
          value={get(props.values, 'demoStudentLimit', '')}
          onChange={value => props.onChange('demoStudentLimit', value)}
          errorText={get(props.errors, 'demoStudentLimit', null)}
        />
      </Column>
    </Row>
    <Row>
      <Column size={6}>
        <TextInput
          disabled={props.submitting}
          label="Address"
          value={get(props.values, 'address', '')}
          onChange={value => props.onChange('address', value)}
          errorText={get(props.errors, 'address', null)}
        />
      </Column>
      <Column size={3}>
        <TextInput
          disabled={props.submitting}
          label="City"
          value={get(props.values, 'city', '')}
          onChange={value => props.onChange('city', value)}
          errorText={get(props.errors, 'city', null)}
        />
      </Column>
      <Column size={3}>
        <MaskInput
          disabled={props.submitting}
          label="Phone"
          value={get(props.values, 'phone', '')}
          onChange={value => props.onChange('phone', value)}
          errorText={get(props.errors, 'phone', null)}
          maskType="phone"
        />
      </Column>
    </Row>
    <Row>
      <PermissionValidator allowedFor={[Roles.ADMIN]}>
        <Column size={2}>
          <Select
            disabled={props.submitting}
            label="Module Points Weight"
            value={get(props.values, 'modulePointRelevance', '')}
            onChange={value => props.onChange('modulePointRelevance', value)}
            errorText={get(props.errors, 'modulePointRelevance', '')}
            options={range(0.3, 1.01, 0.05).map(value => ({
              value: round(value, 2),
              label: `${round(value * 100)}%`,
            }))}
          />
        </Column>
      </PermissionValidator>
      {get(props, 'values.companyDistributor', props.companyDistributor) === MASTERTEST_DISTRIBUTOR_ID && (
        <Column size={3}>
          <TextInput
            required={true}
            disabled={props.submitting}
            label="INEP"
            value={get(props.values, 'inep', '')}
            onChange={value => props.onChange('inep', value)}
            errorText={get(props.errors, 'inep', null)}
          />
        </Column>
      )}
      {get(props.values, 'id', '') && (
        <Column size={4}>
          <FileInput
            label="Upload a logo to the school"
            accept="image"
            disabled={props.submitting}
            value={get(props.values, 'logoUrl', '')}
            onChange={(key) => props.onChange('logoUrl', key)}
            errorText={get(props.errors, 'logoUrl', '')}
          />
        </Column>
      )}
      <PermissionValidator allowedFor={[Roles.ADMIN]}>
        <Column size={1}>
          <Switch
            label="Allow SR Bonus"
            titleOff="No"
            titleOn="Yes"
            onChange={value => props.onChange('allowSpeechRecognitionBonus', value)}
            value={get(props.values, 'allowSpeechRecognitionBonus', false)}
            disabled={props.submitting}
          />
        </Column>
      </PermissionValidator>
      <PermissionValidator allowedFor={[Roles.ADMIN]}>
        <Column size={1}>
          <Switch
            label="Allow Level Selection"
            titleOff="No"
            titleOn="Yes"
            onChange={value => props.onChange('allowLevelSelection', value)}
            value={get(props.values, 'allowLevelSelection', false)}
            disabled={props.submitting}
          />
        </Column>
      </PermissionValidator>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update School' : 'Create School'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

SchoolForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disableCompany: PropTypes.bool,
  isDirty: PropTypes.func,
  companyCountry: PropTypes.string,
  companyDistributor: PropTypes.string,
  states: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SchoolForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disableCompany: false,
  companyCountry: '',
  companyDistributor: '',
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default SchoolForm;
