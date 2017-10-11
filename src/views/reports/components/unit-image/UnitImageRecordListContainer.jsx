import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import UnitImageRecordList from './UnitImageRecordList';
import UnitImageReportListService from '../../services/UnitImageRecordListService';

class UnitImageRecordListContainer extends Component {

  componentDidMount() {
    UnitImageReportListService.init();
  }

  render() {
    return (
      <UnitImageRecordList
        units={toJS(UnitImageReportListService.units)}
        fetching={UnitImageReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitImageRecordListContainer);
