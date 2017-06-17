import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import QuestionList from './QuestionList';
import QuestionListService from '../services/QuestionListService';

const QuestionListContainer = () => (
  <QuestionList
    questions={toJS(QuestionListService.questions)}
    fetching={QuestionListService.fetch.fetching}
    onDelete={QuestionListService.handleRemove}
    onSelect={QuestionListService.handleSelect}
  />
);

export default observer(QuestionListContainer);
