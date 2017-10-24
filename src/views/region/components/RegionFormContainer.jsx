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

  componentWillMount() {
    RegionFormService.handleLoad(this.props.regionId);
  }

  render() {
    return (
      <RegionForm
        onSubmit={RegionFormService.handleSubmit}
        onChange={RegionFormService.form.setValue}
        onReset={RegionFormService.form.reset}
        values={RegionFormService.form.getValues()}
        errors={RegionFormService.form.errors}
        submitting={RegionFormService.fetch.fetching}
        error={RegionFormService.submit.error}
        isDirty={RegionFormService.form.isDirty}
      />
    );
  }
}

export default observer(RegionFormContainer);
