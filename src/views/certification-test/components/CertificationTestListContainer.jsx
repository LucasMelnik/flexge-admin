import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestList from './CertificationTestList';
import CertificationTestListService from '../services/CertificationTestListService';

class CertificationTestListContainer extends Component {
  componentDidMount() {
    CertificationTestListService.init();
  }

  render() {
    return (
      <CertificationTestList
        certificationTests={toJS(CertificationTestListService.certificationTests)}
        onChange={CertificationTestListService.form.setValue}
        values={CertificationTestListService.form.getValues()}
        fetching={CertificationTestListService.fetch.fetching}
        onDelete={CertificationTestListService.handleRemove}
      />
    );
  }
}

export default observer(CertificationTestListContainer);
