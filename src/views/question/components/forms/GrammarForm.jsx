import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationContainer from '../inputs/TranslationContainer';
import SlicesToRemoveContainer from "../inputs/SlicesToRemoveContainer";

const GrammarForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
    <Separator size="xs" />
    <SlicesToRemoveContainer
      onChange={(slices, texts) => {
        props.onChange('indexesToRemove', slices);
        props.onChange('textsRemoved', texts);
      }}
      text={get(props.values, 'text', '')}
      errorText={get(props.errors, 'indexesToRemove', '')}
      maxRemovesAllowed={1}
    />
  </div>
);

GrammarForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

GrammarForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default GrammarForm;