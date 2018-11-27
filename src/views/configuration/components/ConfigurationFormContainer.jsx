import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ConfigurationFormService from '../services/ConfigurationFormService';
import ConfigurationForm from './ConfigurationForm';

class ConfigurationFormContainer extends Component {
  static propTypes = {
    configurationId: PropTypes.string,
  };

  static defaultProps = {
    configurationId: null,
  };

  componentWillMount() {
    ConfigurationFormService.handleLoad(this.props.configurationId);
  }

  render() {
    return (
      <ConfigurationForm
        onSubmit={ConfigurationFormService.handleSubmit}
        onChange={ConfigurationFormService.form.setValue}
        onReset={ConfigurationFormService.form.reset}
        values={ConfigurationFormService.form.getValues()}
        errors={ConfigurationFormService.form.errors}
        submitting={ConfigurationFormService.submit.fetching}
        isDirty={ConfigurationFormService.form.isDirty}
      />
    );
  }
}

export default observer(ConfigurationFormContainer);
