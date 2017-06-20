import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from "../../../../core/layout/Row";
import Column from "../../../../core/layout/Column";
import TextInput from "../../../../core/form/TextInput";
import TranslationInputContainer from '../inputs/TranslationInputContainer';

const PresentationItemForm = props => (
  <div>
    <Row>
      <Column lgSize={12}>
        <TextInput
          floatingLabel
          fullWidth
          label="Title (The field is just required for Vocabulary units.)"
          disabled={props.submitting}
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', '')}
        />
      </Column>
    </Row>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
  </div>
);

PresentationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

PresentationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default PresentationItemForm;
