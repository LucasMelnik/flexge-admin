import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Separator from '../../../core/layout/Separator';
import Row from "../../../core/layout/Row";
import Column from "../../../core/layout/Column";
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import Dictationform from './forms/DictationForm';
import GapFillForm from "./forms/GapFillForm";
import GrammarForm from "./forms/GrammarForm";
import MovieForm from "./forms/MovieForm";
import MultipleCompletePhraseForm from "./forms/MultipleCompletePhraseForm";
import MusicVideoForm from "./forms/MusicVideoForm";

const QuestionForm = props => (
  <Paper>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column lgSize={6}>
          <FetchAutoComplete
            url="question-types?page=1&size=100"
            fullWidth
            disabled={props.submitting || !!props.values.id}
            label="Question Type"
            value={get(props.values, 'type.name', '')}
            onSelect={company => props.onChange('type', company)}
            errorText={get(props.errors, 'type', '')}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column lgSize={6}>
          Add Grammar select
        </Column>
      </Row>
      {get(props.values, 'type.key', '') === 'DICTATION' && (
        <Dictationform
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
           isDirty={props.isDirty}
        />
      )}
      {get(props.values, 'type.key', '') === 'GAP_FILL' && (
        <GapFillForm
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
           isDirty={props.isDirty}
        />
      )}
      {get(props.values, 'type.key', '') === 'GRAMMAR' && (
        <GrammarForm
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
           isDirty={props.isDirty}
        />
      )}
      {get(props.values, 'type.key', '') === 'MOVIE' && (
        <MovieForm
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
           isDirty={props.isDirty}
        />
      )}
      {get(props.values, 'type.key', '') === 'MULTIPLE_COMPLETE_PHRASE' && (
        <MultipleCompletePhraseForm
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
        />
      )}
      {get(props.values, 'type.key', '') === 'MUSIC_VIDEO' && (
        <MusicVideoForm
           onChange={props.onChange}
           errors={props.errors}
           values={props.values}
           submitting={props.submitting}
        />
      )}
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Question' : 'Create Question'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        onClick={props.onReset}
        label="Discard Changes"
      />
    </form>
  </Paper>
);

QuestionForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

QuestionForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default QuestionForm;
