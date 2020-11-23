import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import Row from '../../../../../core/layout/Row';
import Column from '../../../../../core/layout/Column';
import FormButtons from '../../../../../core/form/FormButtons';
import FetchSelect from '../../../../../core/form/FetchSelect';

const UnitFunctionOfLanguageForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={12}>
        <FetchSelect
          showSearch
          multiple
          url="functions-of-language"
          params={{
            query: {
              grammar: {$in: uniq(props.items.filter(ui => ui.item.grammar && ui.item.grammar.id).map(ui => ui.item.grammar.id))}
            }
          }}
          disabled={props.submitting || !props.values.id}
          label="Select the functions to be related to the unit"
          value={get(props.values, 'functionsOfLanguage', '')}
          onChange={value => props.onChange('functionsOfLanguage', value)}
          errorText={get(props.errors, 'functionsOfLanguage', '')}
          resultTransformer={{
            text: 'title',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <FormButtons
      confirmLabel="Save"
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
);

UnitFunctionOfLanguageForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  items: PropTypes.array,
};

UnitFunctionOfLanguageForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
};

export default UnitFunctionOfLanguageForm;
