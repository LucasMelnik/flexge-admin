import React from 'react';
import PropTypes from 'prop-types';
import Separator from "../../../../core/layout/Separator";
import TranslationContainer from '../inputs/TranslationContainer';
import YoutubeLinkContainer from "../inputs/YoutubeLinkContainer";
import AnswersContainer from "../inputs/AnswersContainer";

const MovieForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
    <Separator size="xs" />
    <YoutubeLinkContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      requiredCut
    />
    <Separator size="xs" />
    <AnswersContainer
      needCorrectAnswer
      onChange={answers => props.onChange('answers', answers)}
    />
  </div>
);

MovieForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

MovieForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onChange: () => false,
};

export default MovieForm;