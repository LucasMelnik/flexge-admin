import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigCertificate from './WhitelabelConfigCertificate';
import WhitelabelConfigCertificateService from '../services/WhitelabelConfigCertificateService';

class WhitelabelConfigCertificateContainer extends Component {
  static propTypes = {
    whitelabelConfigId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    WhitelabelConfigCertificateService.init(this.props.whitelabelConfigId);
  }

  render() {
    return (
      <WhitelabelConfigCertificate
        certificate={toJS(WhitelabelConfigCertificateService.certificate)}
        fetching={WhitelabelConfigCertificateService.fetch.fetching}
      />
    );
  }
}

export default observer(WhitelabelConfigCertificateContainer);
