import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import RegionForm from './RegionForm';
import RegionFormService from '../services/RegionFormService';

class RegionFormContainer extends Component {

  static propTypes = {
    regionId: PropTypes.string,
  };

  static defaultProps = {
    regionId: null,
  };

  regionFormService = new RegionFormService();
  componentWillMount() {
    this.regionFormService.handleLoad(this.props.regionId);
  }

  render() {
    return (
      <RegionForm
        onSubmit={this.regionFormService.handleSubmit}
        onChange={this.regionFormService.form.setValue}
        onReset={this.regionFormService.form.reset}
        values={this.regionFormService.form.getValues()}
        errors={this.regionFormService.form.errors}
        submitting={this.regionFormService.submit.fetching}
        isDirty={this.regionFormService.form.isDirty}
      />
    );
  }
}

export default observer(RegionFormContainer);
