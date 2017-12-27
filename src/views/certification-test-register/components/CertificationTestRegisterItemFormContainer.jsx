import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CertificationTestRegisterFormService from '../services/CertificationTestRegisterFormService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class CertificationTestRegisterItemFormContainer extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  certificationTestRegisterFormService = new CertificationTestRegisterFormService();
  componentWillMount() {
    this.certificationTestRegisterFormService.handleLoad(this.props.certificationTestId);
  }

  render() {
    return this.certificationTestRegisterFormService.form.getValue('id') ? (
      <ItemFormContainer
        itemsTypeUrl={`/item-types?query[allowedForCertificationTest]=${this.certificationTestRegisterFormService.form.getValue('ability')}`}
        endpointUrl={`certification-test-course-ability/${this.props.certificationTestId}/items`}
        onSaveSuccess={this.props.onSaveSuccess}
        defaultGrammar={this.certificationTestRegisterFormService.form.getValue('grammar')}
        timeProperty="defaultTime"
      />
    ) : null;
  }
}

export default observer(CertificationTestRegisterItemFormContainer);
