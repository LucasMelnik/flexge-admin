import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CertificationTestRegisterItemListContainer from './CertificationTestRegisterItemListContainer';
import CertificationTestRegisterItemFormContainer from './CertificationTestRegisterItemFormContainer';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

export default class CertificationTestRegisterItems extends Component {

  static propTypes = {
    certificationTestId: PropTypes.string.isRequired,
  };

  state = { actualScene: 'LIST' };

  handleChangeToList = () => {
    this.setState({
      actualScene: 'LIST',
    });
  };

  handleChangeToForm = () => {
    this.setState({
      actualScene: 'FORM',
    });
  };

  render() {
    return (
      <Card
        title={this.state.actualScene === 'LIST' ? 'Certification Test Items' : 'Certification Test Item Form'}
        actions={this.state.actualScene === 'LIST' ? (
          <Button
            type="primary"
            icon="plus"
            onClick={this.handleChangeToForm}
            label="Add new item"
          />
        ) : (
          <Button
            icon="arrow-left"
            label="Back"
            onClick={this.handleChangeToList}
          />
        )}
      >
        {this.state.actualScene === 'LIST' ? (
          <CertificationTestRegisterItemListContainer
            certificationTestId={this.props.certificationTestId}
          />
        ) : (
          <CertificationTestRegisterItemFormContainer
            onSaveSuccess={this.handleChangeToList}
            certificationTestId={this.props.certificationTestId}
          />
        )}
      </Card>
    );
  }
}
