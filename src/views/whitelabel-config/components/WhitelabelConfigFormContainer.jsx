import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import WhitelabelConfigForm from './WhitelabelConfigForm';
import WhitelabelConfigFormService from '../services/WhitelabelConfigFormService';

class WhitelabelConfigFormContainer extends Component {

  static propTypes = {
    whitelabelConfigId: PropTypes.string,
  };

  static defaultProps = {
    whitelabelConfigId: null,
  };

  whitelabelConfigFormService = new WhitelabelConfigFormService();
  componentWillMount() {
    this.whitelabelConfigFormService.handleLoad(this.props.whitelabelConfigId);
  }

  render() {
    return (
      <WhitelabelConfigForm
        onSubmit={this.whitelabelConfigFormService.handleSubmit}
        onChange={this.whitelabelConfigFormService.form.setValue}
        onReset={this.whitelabelConfigFormService.form.reset}
        values={this.whitelabelConfigFormService.form.getValues()}
        errors={this.whitelabelConfigFormService.form.errors}
        submitting={this.whitelabelConfigFormService.submit.fetching}
        isDirty={this.whitelabelConfigFormService.form.isDirty}
      />
    );
  }
}

export default observer(WhitelabelConfigFormContainer);
