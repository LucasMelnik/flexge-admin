import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
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
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
    />
  </div>
);

MovieForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

MovieForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default MovieForm;