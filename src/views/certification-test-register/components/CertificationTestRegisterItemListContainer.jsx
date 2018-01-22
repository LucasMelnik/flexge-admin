import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CertificationTestRegisterItemList from './CertificationTestRegisterItemList';
import CertificationTestRegisterItemListService from '../services/CertificationTestRegisterItemListService';

class CertificationTestRegisterItemListContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    CertificationTestRegisterItemListService.init(this.props.certificationTestId);
  }

  render() {
    return (
      <CertificationTestRegisterItemList
        items={toJS(CertificationTestRegisterItemListService.items)}
        fetching={CertificationTestRegisterItemListService.fetch.fetching}
        onDelete={CertificationTestRegisterItemListService.handleUnlinkItem}
        onOrderChange={CertificationTestRegisterItemListService.handleOrderChange}
        onSaveSuccess={CertificationTestRegisterItemListService.load}
      />
    );
  }
}

export default observer(CertificationTestRegisterItemListContainer);
