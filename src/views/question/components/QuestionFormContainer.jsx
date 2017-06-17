import React from 'react';
import { observer } from 'mobx-react';
import QuestionForm from './QuestionForm';
import QuestionFormService from '../services/QuestionFormService';

const QuestionFormContainer = () => (
  <QuestionForm
    onSubmit={QuestionFormService.handleSubmit}
    setValidationsByQuestionType={QuestionFormService.setValidationsByQuestionType}
    onChange={QuestionFormService.form.setValue}
    onReset={QuestionFormService.form.reset}
    values={QuestionFormService.form.getValues()}
    errors={QuestionFormService.form.errors}
    isDirty={QuestionFormService.form.isDirty}
    submitting={QuestionFormService.submit.fetching}
    error={QuestionFormService.submit.error}
  />
);

export default observer(QuestionFormContainer);
