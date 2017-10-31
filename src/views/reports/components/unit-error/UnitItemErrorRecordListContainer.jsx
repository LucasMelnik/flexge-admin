import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemErrorRecordList from './UnitItemErrorRecordList';
import UnitItemErrorReportListService from '../../services/UnitItemErrorRecordListService';

class UnitItemErrorRecordListContainer extends Component {

  componentDidMount() {
    UnitItemErrorReportListService.init();
  }

  render() {
    return (
      <UnitItemErrorRecordList
        items={toJS(UnitItemErrorReportListService.items)}
        fetching={UnitItemErrorReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemErrorRecordListContainer);
