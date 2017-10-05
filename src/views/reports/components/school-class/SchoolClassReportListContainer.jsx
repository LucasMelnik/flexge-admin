import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolClassReportList from './SchoolClassReportList';
import SchoolClassReportListService from '../../services/SchoolClassReportListService';

class SchoolClassReportListContainer extends Component {

  componentDidMount() {
    SchoolClassReportListService.init();
  }

  render() {
    return (
      <SchoolClassReportList
        schoolClasses={toJS(SchoolClassReportListService.schoolClasses)}
        fetching={SchoolClassReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(SchoolClassReportListContainer);
