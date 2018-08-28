import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AbilityItemExecutionList from './AbilityItemExecutionList';
import CertificationTestExecutionAbilityItemListService from '../services/CertificationTestExecutionAbilityItemListService';
import CertificationTestReviewItemFormService from "../services/CertificationTestReviewItemFormService";
import CertificationTestDetailService from "../services/CertificationTestDetailService";

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

  handleOpenReview = (item) => {
    CertificationTestReviewItemFormService.init(item, () => this.certificationTestExecutionAbilityItemListService.load(this.props.ability, this.props.certificationTestId));
    CertificationTestReviewItemFormService.handleOpen();
  };

  render() {
    return (
      <AbilityItemExecutionList
        items={toJS(this.certificationTestExecutionAbilityItemListService.items)}
        fetching={this.certificationTestExecutionAbilityItemListService.fetch.fetching}
        ability={this.props.ability}
        onOpenReview={this.handleOpenReview}
        disabledReview={
          CertificationTestDetailService.certificationTest.approvedAt ||
          CertificationTestDetailService.certificationTest.failedAt
        }
      />
    );
  }
}

export default observer(AbilityItemExecutionListContainer);
