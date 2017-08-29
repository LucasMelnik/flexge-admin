import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitList from './UnitList';
import UnitListService from '../../services/UnitListService';

class UnitListContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    UnitListService.init(this.props.moduleId);
  }

  render() {
    return (
      <UnitList
        units={toJS(UnitListService.units)}
        fetching={UnitListService.fetch.fetching}
        onDelete={UnitListService.handleRemove}
      />
    );
  }
}

export default observer(UnitListContainer);
