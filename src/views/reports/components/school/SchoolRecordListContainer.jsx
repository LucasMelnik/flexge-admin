import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import SchoolRecordList from './SchoolRecordList';
import SchoolReportListService from '../../services/SchoolRecordListService';

class SchoolRecordListContainer extends Component {

  componentDidMount() {
    SchoolReportListService.init();
  }

  handleSelect = (school) => {
    browserHistory.push(`/records/school/${school.id}`);
  };

  render() {
    return (
      <SchoolRecordList
        schools={toJS(SchoolReportListService.schools)}
        fetching={SchoolReportListService.fetch.fetching}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default observer(SchoolRecordListContainer);
