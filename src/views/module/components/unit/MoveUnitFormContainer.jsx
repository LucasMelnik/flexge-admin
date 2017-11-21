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

  componentDidMount() {
    MoveUnitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  render() {
    return (
      <MoveUnitForm
        onSubmit={MoveUnitFormService.handleSubmit}
        onChange={MoveUnitFormService.form.setValue}
        onReset={MoveUnitFormService.form.reset}
        values={MoveUnitFormService.form.getValues()}
        errors={MoveUnitFormService.form.errors}
        submitting={MoveUnitFormService.fetch.fetching}
        isDirty={MoveUnitFormService.form.isDirty}
      />
    );
  }
}

export default observer(MoveUnitFormContainer);
