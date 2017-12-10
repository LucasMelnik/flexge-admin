import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import GrammarNeedsList from './GrammarNeedsList';
import GrammarNeedsRecordListService from '../../services/GrammarNeedsRecordListService';

class GrammarNeedsListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  grammarNeedsRecordListService = new GrammarNeedsRecordListService();
  componentDidMount() {
    this.grammarNeedsRecordListService.init(this.props.schoolId, this.props.classId);
    this.grammarNeedsRecordListService.loadSchoolClassGrammarNeeds();
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

export default observer(GrammarNeedsListContainer);
