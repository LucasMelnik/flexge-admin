import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormatReviewFormContainer from './FormatReviewFormContainer';
import ContentReviewFormContainer from './ContentReviewFormContainer';
import Button from '../../../core/form/Button';
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
          <div style={{ padding: 10 }}>
             <FormatReviewFormContainer
               expanded={this.state.expanded}
               reviewId={this.props.reviewId}
               unitId={this.props.unitId}
             />
          </div>
         ),
        title: 'Format Review',
      });
      tabs.push({
        content: (
           <div style={{ padding: 10 }}>
             <ContentReviewFormContainer
               expanded={this.state.expanded}
               reviewId={this.props.reviewId}
               unitId={this.props.unitId}
             />
           </div>
         ),
        title: 'Content Review',
      });
    }

    if (this.props.imageReview) {
      tabs.push(
        {
          content: (
             <div style={{ padding: 10 }}>
               <ImageReviewFormContainer
                 expanded={this.state.expanded}
                 reviewId={this.props.reviewId}
                 unitId={this.props.unitId}
               />
             </div>
           ),
          title: 'Image Review',
        }
      );
    }

    return (
      <div>
        <div style={{ height: 240 }} />
        <div
          style={{
            position: 'fixed',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? '89%' : this.props.fetching ? 70 : 230,
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
            <Button
              type="primary"
              icon={this.state.expanded ? 'arrow-down' : 'arrow-up'}
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
