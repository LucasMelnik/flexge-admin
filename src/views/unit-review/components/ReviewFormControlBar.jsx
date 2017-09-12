import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormatReviewFormContainer from './FormatReviewFormContainer';
import ContentReviewFormContainer from './ContentReviewFormContainer';
import IconButton from '../../../core/form/IconButton';
import Async from '../../../core/layout/Async';
import Tabs from '../../../core/layout/Tabs';
import ImageReviewFormContainer from './ImageReviewFormContainer';

export default class ReviewFormControlBar extends Component {

  static propTypes = {
    unitId: PropTypes.string,
    reviewId: PropTypes.string,
    imageReview: PropTypes.bool,
    fetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    unitId: null,
    reviewId: null,
    imageReview: false,
  };

  state = {
    expanded: false,
  };

  handleExpandOrRetractComment = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const tabs = [];
    if (localStorage.role !== 'IMAGE_ADMIN') {
      tabs.push({
        content: (
           <FormatReviewFormContainer
             expanded={this.state.expanded}
             reviewId={this.props.reviewId}
             unitId={this.props.unitId}
           />
         ),
        title: 'Format Review'
      });
      tabs.push({
        content: (
           <ContentReviewFormContainer
             expanded={this.state.expanded}
             reviewId={this.props.reviewId}
             unitId={this.props.unitId}
           />
         ),
        title: 'Content Review'
      });
    }

    if (this.props.imageReview) {
      tabs.push(
        {
          content: (
             <ImageReviewFormContainer
               expanded={this.state.expanded}
               reviewId={this.props.reviewId}
               unitId={this.props.unitId}
             />
           ),
          title: 'Image Review'
        }
      );
    }

    return (
      <div>
        <div style={{ height: 360 }} />
        <div
          style={{
            position: 'fixed',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? '89%' : this.props.fetching ? 70 : 360,
            maxHeight: '89%',
            transition: 'all 1s',
            backgroundColor: '#fff',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 15,
              top: -15,
              zIndex: 1,
            }}
          >
            <IconButton
              type="primary"
              icon={this.state.expanded ? 'fa-arrow-down' : 'fa-arrow-up'}
              onClick={() => this.handleExpandOrRetractComment()}
            />
          </div>
          <Async fetching={this.props.fetching || !this.props.reviewId || !this.props.unitId}>
            <Tabs
              tabs={tabs}
            />
          </Async>
        </div>
      </div>
    );
  }
}
