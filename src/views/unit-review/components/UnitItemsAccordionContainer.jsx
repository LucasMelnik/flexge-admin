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
  unitItemListService = new UnitItemListService();

  componentWillMount() {
    this.unitItemListService.init(this.props.unitId);
    this.loadUnitService.handleLoad(this.props.moduleId, this.props.unitId);
  }

  render() {
    return (
      <UnitItemsAccordion
        unit={this.loadUnitService.unit}
        items={toJS(this.unitItemListService.items)}
        fetching={this.unitItemListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemsAccordionContainer);
