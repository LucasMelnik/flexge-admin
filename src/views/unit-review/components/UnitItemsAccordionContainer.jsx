import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitItemListService from '../../module/services/UnitItemListService';
import LoadUnitService from '../../module/services/LoadUnitService';
import UnitItemsAccordion from './UnitItemsAccordion';

class UnitItemsAccordionContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    unitId: PropTypes.string.isRequired,
  };

  loadUnitService = new LoadUnitService();

  componentWillMount() {
    UnitItemListService.init(this.props.unitId);
    this.loadUnitService.handleLoad(this.props.moduleId, this.props.unitId);
  }

  render() {
    return (
      <UnitItemsAccordion
        unit={this.loadUnitService.unit}
        items={toJS(UnitItemListService.items)}
        fetching={UnitItemListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemsAccordionContainer);
