import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitList from './UnitList';
import UnitListService from '../../services/UnitListService';
import LoadModuleService from '../../services/LoadModuleService';
import { Roles } from '../../../../core/util';

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
        units={toJS(UnitListService.visibleUnits)}
        academicPlan={this.props.academicPlan}
        fetching={UnitListService.fetch.fetching || UnitListService.reorderSubmitting}
        onDelete={UnitListService.handleRemove}
        onCopyToProduction={UnitListService.handleCopyToProduction}
        onAutoReorder={UnitListService.handleAutoReorder}
        allowReorder={LoadModuleService.module.createdBy.id === localStorage.id || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role)}
      />
    );
  }
}

export default observer(UnitListContainer);
