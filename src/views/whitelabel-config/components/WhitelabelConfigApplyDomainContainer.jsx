import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigCertificateService from '../services/WhitelabelConfigCertificateService';
import Button from '../../../core/form/Button';

class WhitelabelConfigApplyDomainContainer extends Component {
  static propTypes = {
    whitelabelConfigId: PropTypes.string.isRequired,
  };

  render() {
    const certificate = toJS(WhitelabelConfigCertificateService.certificate);
    return (
      <Button
        type={certificate.Status === 'ISSUED' ? 'primary' : 'default'}
        disabled={certificate.Status !== 'ISSUED'}
        loading={WhitelabelConfigCertificateService.submit.fetching}
        label={certificate.Status === 'ISSUED' ? 'Apply certificate to whitelabel domains' : 'Await certificate creation'}
        icon="api"
        onClick={WhitelabelConfigCertificateService.applyCertificate}
      />
    );
  }
}

export default observer(WhitelabelConfigApplyDomainContainer);
