import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import FetchSelect from '../../../core/form/FetchSelect';

const FunctionOfLanguageForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={7}>
        <TextInput
          required
          disabled={props.submitting}
          label="Title"
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', null)}
        />
      </Column>
      <Column size={5}>
        <FetchSelect
          required
          url="grammars"
          fullWidth
          disabled={props.submitting}
          label="Grammar"
          value={get(props.values, 'grammar', '')}
          onChange={(value) => props.onChange('grammar', value)}
          errorText={get(props.errors, 'grammar', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <Row>
      <Column size={12}>
        <TextInput
          disabled={props.submitting}
          label="Spanish Title"
          value={get(props.values, 'spanishTitle', '')}
          onChange={value => props.onChange('spanishTitle', value)}
          errorText={get(props.errors, 'spanishTitle', null)}
        />
      </Column>
      <Column size={12}>
        <TextInput
          disabled={props.submitting}
          label="Portuguese Title "
          value={get(props.values, 'portugueseTitle', '')}
          onChange={value => props.onChange('portugueseTitle', value)}
          errorText={get(props.errors, 'portugueseTitle', null)}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel={props.values.id ? 'Update Function of Language' : 'Create Function of Language'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

FunctionOfLanguageForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

FunctionOfLanguageForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default FunctionOfLanguageForm;
