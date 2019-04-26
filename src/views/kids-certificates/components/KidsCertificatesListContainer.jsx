import React, { Component } from 'react';
import { toJS } from 'mobx/lib/mobx';
import { observer } from 'mobx-react/index';
import KidsCertificatesList from './KidsCertificatesList';
import KidsCertificateListService from '../services/KidsCertificateListService';

class KidsCertificatesListContainer extends Component {

  componentDidMount() {
    KidsCertificateListService.init();
  }

  render() {
    return (
      <KidsCertificatesList
        modules={toJS(KidsCertificateListService.modules)}
        fetching={KidsCertificateListService.fetch.fetching}
      />
    );
  }
}

export default observer(KidsCertificatesListContainer);
