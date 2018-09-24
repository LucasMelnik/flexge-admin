import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudiedGrammarList from './StudiedGrammarList';
import StudiedGrammarListService from '../../services/StudiedGrammarListService';

class StudentStudiedGrammarListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  grammarAnalysisListService = new StudiedGrammarListService();
  componentDidMount() {
    this.grammarAnalysisListService.loadByStudent(this.props.studentId);
  }

  render() {
    return (
      <StudiedGrammarList
        grammars={toJS(this.grammarAnalysisListService.grammars)}
        fetching={this.grammarAnalysisListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentStudiedGrammarListContainer);
