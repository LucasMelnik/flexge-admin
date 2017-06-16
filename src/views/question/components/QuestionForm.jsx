import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Separator from '../../../core/layout/Separator';
import Row from "../../../core/layout/Row";
import Column from "../../../core/layout/Column";
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';
import TranslationContainer from './TranslationContainer';
import SlicesToRemoveContainer from './SlicesToRemoveContainer';
import AnswersContainer from './AnswersContainer';

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
      <TranslationContainer
        onChange={props.onChange}
        submitting={props.submitting}
        values={props.values}
        errors={props.errors}
      />
      <Separator size="xs" />
      <SlicesToRemoveContainer
        onChange={slices => props.onChange('indexesToRemove', slices)}
        text={get(props.values, 'text', '')}
      />
      <Separator size="xs" />
      <AnswersContainer
        onChange={answers => props.onChange('answers', answers)}
      />
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
