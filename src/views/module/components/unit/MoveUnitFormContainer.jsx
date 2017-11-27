import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MoveUnitForm from './MoveUnitForm';
import MoveUnitFormService from '../../services/MoveUnitFormService';

class MoveUnitFormContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
  };

  moveUnitFormService = new MoveUnitFormService();
  componentDidMount() {
    this.moveUnitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  render() {
    return (
      <MoveUnitForm
        onSubmit={this.moveUnitFormService.handleSubmit}
        onChange={this.moveUnitFormService.form.setValue}
        onReset={this.moveUnitFormService.form.reset}
        values={this.moveUnitFormService.form.getValues()}
        errors={this.moveUnitFormService.form.errors}
        submitting={this.moveUnitFormService.submit.fetching}
        isDirty={this.moveUnitFormService.form.isDirty}
      />
    );
  }
}

export default observer(MoveUnitFormContainer);
