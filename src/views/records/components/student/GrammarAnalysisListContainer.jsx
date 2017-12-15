import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import GrammarAnalysisList from './GrammarAnalysisList';
import GrammarAnalysisListService from '../../services/GrammarAnalysisListService';

class GrammarAnalysisListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  grammarAnalysisListService = new GrammarAnalysisListService();
  componentDidMount() {
    this.grammarAnalysisListService.load(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <GrammarAnalysisList
        grammars={toJS(this.grammarAnalysisListService.grammars)}
        fetching={this.grammarAnalysisListService.fetch.fetching}
      />
    );
  }
}

export default observer(GrammarAnalysisListContainer);
