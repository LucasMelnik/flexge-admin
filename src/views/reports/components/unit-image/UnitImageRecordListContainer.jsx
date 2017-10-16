import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
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
        totalApprovedImagesCount={UnitImageReportListService.totalApprovedImagesCount}
        fetching={UnitImageReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitImageRecordListContainer);
