import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import range from 'lodash/range';
import toInteger from 'lodash/toInteger';
import moment from 'moment/moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Select from '../../../core/form/Select';
import FetchSelect from '../../../core/form/FetchSelect';

const EvaluationTemplateForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={3}>
        <TextInput
          required
          disabled={props.submitting}
          label="Template Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', null)}
        />
      </Column>
      {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
        <Column size={3}>
          <FetchSelect
            required
            showSearch
            isPaginated
            label="School"
            value={get(props.values, 'school', '')}
            onChange={value => props.onChange('school', value)}
            url={`schools${
              localStorage.role === 'DISTRIBUTOR_MANAGER'
                ? `?distributor=${localStorage.getItem('distributor')}`
                : localStorage.role === 'COMPANY_MANAGER'
                ? `?company=${localStorage.getItem('company')}`
                : ''
              }`}
            errorText={get(props.errors, 'school', null)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      <Column size={1}>
        <Select
          required
          label="Year"
          value={get(props.values, 'year', '')}
          onChange={value => props.onChange('year', value)}
          options={range(2018, toInteger(moment().format('YYYY')) + 5).map(year => ({
            label: year.toString(),
            value: year,
          }))}
          errorText={get(props.errors, 'year', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Evaluation Template' : 'Create Evaluation Template'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

EvaluationTemplateForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

EvaluationTemplateForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default EvaluationTemplateForm;
