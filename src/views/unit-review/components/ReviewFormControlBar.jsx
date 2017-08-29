import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import FormatReviewFormContainer from './FormatReviewFormContainer';
import ContentReviewFormContainer from './ContentReviewFormContainer';
import IconButton from '../../../core/form/IconButton';
import Card from '../../../core/layout/Card';
import Async from '../../../core/layout/Async';
import Separator from '../../../core/layout/Separator';

export default class ReviewFormControlBar extends Component {

  static propTypes = {
    unitId: PropTypes.string,
    reviewId: PropTypes.string,
    fetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    unitId: null,
    reviewId: null,
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
          }}
        >
          <Card>
            <Separator size="xs" />
            <div
              style={{
                position: 'absolute',
                right: 15,
                top: -15,
              }}
            >
              <IconButton
                type="primary"
                icon={this.state.expanded ? 'fa-arrow-down' : 'fa-arrow-up'}
                onClick={() => this.handleExpandOrRetractComment()}
              />
            </div>
            <Async fetching={this.props.fetching || !this.props.reviewId || !this.props.unitId}>
              <Row>
              <Column lgSize={6} mdSize={6} smSize={6}>
                <ContentReviewFormContainer
                  expanded={this.state.expanded}
                  reviewId={this.props.reviewId}
                  unitId={this.props.unitId}
                />
              </Column>
              <Column lgSize={6} mdSize={6} smSize={6}>
                <FormatReviewFormContainer
                  expanded={this.state.expanded}
                  reviewId={this.props.reviewId}
                  unitId={this.props.unitId}
                />
              </Column>
            </Row>
            </Async>
          </Card>
        </div>
      </div>
    );
  }
}
