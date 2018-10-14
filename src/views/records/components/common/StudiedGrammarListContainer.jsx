import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudiedGrammarList from './StudiedGrammarList';
import StudiedGrammarListService from '../../services/StudiedGrammarListService';

class StudiedGrammarListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  grammarAnalysisListService = new StudiedGrammarListService();
  componentDidMount() {
    this.grammarAnalysisListService.load(this.props.schoolId, this.props.classId);
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

export default observer(StudiedGrammarListContainer);
