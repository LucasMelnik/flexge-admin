import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import LocalizationForm from './LocalizationForm';
import LocalizationFormService from '../services/LocalizationFormService';

class LocalizationFormContainer extends Component {

  static propTypes = {
    localizationId: PropTypes.string,
  };

  static defaultProps = {
    localizationId: null,
  };

  localizationFormService = new LocalizationFormService();
  componentWillMount() {
    this.localizationFormService.handleLoad(this.props.localizationId);
  }

  render() {
    return (
      <LocalizationForm
        onSubmit={this.localizationFormService.handleSubmit}
        onChange={this.localizationFormService.form.setValue}
        onReset={this.localizationFormService.form.reset}
        values={this.localizationFormService.form.getValues()}
        errors={this.localizationFormService.form.errors}
        submitting={this.localizationFormService.fetch.fetching}
        isDirty={this.localizationFormService.form.isDirty}
      />
    );
  }
}

export default observer(LocalizationFormContainer);
