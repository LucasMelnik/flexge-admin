import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import UnitForm from './UnitForm';
import UnitFormService from '../../services/UnitFormService';

class UnitFormContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string,
    moduleId: PropTypes.string,
    disabled: PropTypes.bool,
    reviewId: PropTypes.string,
  };

  static defaultProps = {
    unitId: null,
    moduleId: null,
    disabled: false,
    reviewId: null,
  };

  componentDidMount() {
    UnitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  render() {
    return (
      <UnitForm
        onSubmit={() => {
          if (this.props.reviewId) {
            UnitFormService.handleSubmit();
          } else {
            UnitFormService.handleSubmit(unit => {
              if (unit.type.name.toLowerCase() === 'review') {
                browserHistory.push(`/v2/modules/${unit.module.id}/units/${unit.id}/review-items`)
              } else {
                browserHistory.push(`/v2/modules/${unit.module.id}/units/${unit.id}/items`)
              }
            });
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
