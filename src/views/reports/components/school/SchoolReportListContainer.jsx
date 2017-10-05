import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolReportList from './SchoolReportList';
import SchoolReportListService from '../../services/SchoolReportListService';

class SchoolReportListContainer extends Component {

  componentDidMount() {
    SchoolReportListService.init();
  }

  render() {
    return (
      <SchoolReportList
        schools={toJS(SchoolReportListService.schools)}
        fetching={SchoolReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(SchoolReportListContainer);
