import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestRegisterList from './CertificationTestRegisterList';
import CertificationTestRegisterListService from '../services/CertificationTestRegisterListService';

class CertificationTestRegisterListContainer extends Component {

  componentDidMount() {
    CertificationTestRegisterListService.init();
  }

  render() {
    return (
      <CertificationTestRegisterList
        registers={toJS(CertificationTestRegisterListService.registers)}
        fetching={CertificationTestRegisterListService.fetch.fetching}
        onDelete={CertificationTestRegisterListService.handleRemove}
      />
    );
  }
}

export default observer(CertificationTestRegisterListContainer);
