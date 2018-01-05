import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AbilityItemExecutionList from './AbilityItemExecutionList';
import CertificationTestExecutionAbilityItemListService from '../services/CertificationTestExecutionAbilityItemListService';

class AbilityItemExecutionListContainer extends Component {
  static propTypes = {
    certificationTestId: PropTypes.string.isRequired,
    ability: PropTypes.oneOf([
      'READING',
      'LISTENING',
      'SPEAKING',
      'WRITING',
    ]).isRequired,
  };

  certificationTestExecutionAbilityItemListService = new CertificationTestExecutionAbilityItemListService();
  componentDidMount() {
    this.certificationTestExecutionAbilityItemListService.load(this.props.ability, this.props.certificationTestId);
  }

  render() {
    return (
      <AbilityItemExecutionList
        items={toJS(this.certificationTestExecutionAbilityItemListService.items)}
        fetching={this.certificationTestExecutionAbilityItemListService.fetch.fetching}
        ability={this.props.ability}
      />
    );
  }
}

export default observer(AbilityItemExecutionListContainer);
