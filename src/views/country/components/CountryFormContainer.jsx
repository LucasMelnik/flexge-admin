import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CountryForm from './CountryForm';
import CountryFormService from '../services/CountryFormService';

class CountryFormContainer extends Component {

  static propTypes = {
    countryId: PropTypes.string,
  };

  static defaultProps = {
    countryId: null,
  };

  countryFormService = new CountryFormService();
  componentWillMount() {
    this.countryFormService.handleLoad(this.props.countryId);
  }

  render() {
    return (
      <CountryForm
        onSubmit={this.countryFormService.handleSubmit}
        onChange={this.countryFormService.form.setValue}
        onReset={this.countryFormService.form.reset}
        values={this.countryFormService.form.getValues()}
        errors={this.countryFormService.form.errors}
        submitting={this.countryFormService.submit.fetching}
        isDirty={this.countryFormService.form.isDirty}
      />
    );
  }
}

export default observer(CountryFormContainer);
