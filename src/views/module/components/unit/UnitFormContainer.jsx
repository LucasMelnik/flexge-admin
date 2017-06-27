import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import UnitForm from './UnitForm';
import UnitFormService from '../../services/UnitFormService';

class UnitFormContainer extends Component {

  static propTypes = {
    currentModule: PropTypes.object,
    unitId: PropTypes.string,
    moduleId: PropTypes.string,
    disabled: PropTypes.bool,
    reviewId: PropTypes.string,
  }

  static defaultProps = {
    currentModule: null,
    unitId: null,
    moduleId: null,
    disabled: false,
    reviewId: null,
  }

  componentDidMount() {
    UnitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  componentWillReceiveProps(nextProps) {
    if (!UnitFormService.form.getValue('module')) {
      UnitFormService.form.setValue('module', nextProps.currentModule);
    }
  }

  render() {
    return (
      <UnitForm
        onSubmit={() => {
          if (this.props.reviewId) {
            UnitFormService.handleSubmit();
          } else {
            UnitFormService.handleSubmit(() => browserHistory.push(`/modules/${this.props.moduleId}/units/${this.props.unitId}/items`));
          }
        }}
        onChange={UnitFormService.form.setValue}
        onReset={UnitFormService.form.reset}
        values={UnitFormService.form.getValues()}
        errors={UnitFormService.form.errors}
        submitting={UnitFormService.fetch.fetching}
        error={UnitFormService.fetch.error}
        isDirty={UnitFormService.form.isDirty}
        disabled={this.props.disabled}
      />
    );
  }
}

export default observer(UnitFormContainer);
