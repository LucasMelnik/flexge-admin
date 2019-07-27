import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitList from './UnitList';
import UnitListService from '../../services/UnitListService';
import LoadModuleService from '../../services/LoadModuleService';

class UnitListContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    academicPlan: PropTypes.string.isRequired,
  };

  componentDidMount() {
    UnitListService.init(this.props.moduleId);
  }

  render() {
    return (
      <UnitList
        units={toJS(UnitListService.units)}
        academicPlan={this.props.academicPlan}
        fetching={UnitListService.fetch.fetching || UnitListService.reorderSubmitting}
        onDelete={UnitListService.handleRemove}
        onAutoReorder={UnitListService.handleAutoReorder}
        allowReorder={LoadModuleService.module.createdBy.id === localStorage.id || localStorage.role === 'ADMIN'}
      />
    );
  }
}

export default observer(UnitListContainer);
