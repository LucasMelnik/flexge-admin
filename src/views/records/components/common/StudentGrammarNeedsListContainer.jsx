import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import GrammarNeedsList from './GrammarNeedsList';
import GrammarNeedsRecordListService from '../../services/GrammarNeedsRecordListService';

class StudentGrammarNeedsListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  grammarNeedsRecordListService = new GrammarNeedsRecordListService();
  componentDidMount() {
    this.grammarNeedsRecordListService.loadStudentGrammarNeeds(this.props.studentId);
  }

  render() {
    return (
      <GrammarNeedsList
        grammars={toJS(this.grammarNeedsRecordListService.grammars)}
        fetching={this.grammarNeedsRecordListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentGrammarNeedsListContainer);
