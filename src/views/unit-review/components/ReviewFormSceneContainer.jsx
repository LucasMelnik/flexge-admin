import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReviewFormScene from './ReviewFormScene';
import ContentReviewService from '../services/ContentReviewService';
import LoadUnitService from '../../module/services/LoadUnitService';
import Async from '../../../core/content/Async';

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
    this.loadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    this.contentReviewService.init(this.props.params.reviewId);
  }

  render() {
    return (
      <Async fetching={this.loadUnitService.fetch.fetching || this.contentReviewService.fetch.fetching}>
        {(this.loadUnitService.unit.id  && this.contentReviewService.form.getValue('id')) ? (
          <ReviewFormScene
            unit={this.loadUnitService.unit}
            moduleId={this.props.params.moduleId}
            review={this.contentReviewService.form.getValues()}
          />
        ) : (
          <div />
        )}
      </Async>
    );
  }
}

export default observer(ReviewFormSceneContainer);
