import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewFormScene from './ReviewFormScene';
import ContentReviewService from '../services/ContentReviewService';
import LoadUnitService from '../../module/services/LoadUnitService';
import LoadModuleService from '../../module/services/LoadModuleService';

class ReviewFormSceneContainer extends Component {

  contentReviewService = new ContentReviewService();
  loadUnitService = new LoadUnitService();

  static propTypes = {
    params: PropTypes.shape({
      unitId: PropTypes.string,
      moduleId: PropTypes.string,
      reviewId: PropTypes.string,
    }),
  };

  static defaultProps = {
    params: PropTypes.shape({
      unitId: null,
      moduleId: null,
      reviewId: null,
    }),
  };

  componentWillMount() {
    LoadModuleService.handleLoad(this.props.params.moduleId);
    this.loadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    this.contentReviewService.init(this.props.params.reviewId);
  }

  render() {
    return (
      <ReviewFormScene
        unit={this.loadUnitService.unit}
        review={this.contentReviewService.form.getValues()}
        module={LoadModuleService.module}
        fetching={this.loadUnitService.fetch.fetching || this.contentReviewService.fetch.fetching || LoadModuleService.fetch.fetching}
      />
    );
  }
}

export default observer(ReviewFormSceneContainer);
