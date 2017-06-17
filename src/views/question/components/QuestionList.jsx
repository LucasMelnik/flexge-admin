import React from 'react';

import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const QuestionList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Group',
            path: 'group',
          },
          {
            label: 'Text',
            path: 'text',
          },
          {
            label: 'Translation',
            path: 'translation',
          },
          {
            label: 'Grammar',
            path: 'grammar.name',
          },
        ]}
        rows={props.questions}
        selectable
        onSelect={row => props.onSelect(row)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired,
    grammar: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default QuestionList;
