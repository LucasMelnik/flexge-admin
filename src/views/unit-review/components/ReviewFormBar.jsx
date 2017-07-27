import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import FormatReviewFormContainer from './FormatReviewFormContainer';
import ContentReviewFormContainer from './ContentReviewFormContainer';

export default class ReviewFormControlBar extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    reviewId: PropTypes.string.isRequired,
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
      <Paper
        style={{
          position: 'fixed',
          zIndex: 3,
          bottom: 0,
          left: 0,
          height: this.state.expanded ? '89%' : 360,
          maxHeight: '89%',
        }}
      >
        <FloatActionButton
          style={{
            position: 'absolute',
            right: 15,
            top: -30,
          }}
          icon={this.state.expanded ? 'arrow_downward' : 'arrow_upward'}
          primary
          onClick={() => this.handleExpandOrRetractComment()}
        />
        <Row

        >
          <Column lgSize={6}>
            <ContentReviewFormContainer
              expanded={this.state.expanded}
              reviewId={this.props.reviewId}
              unitId={this.props.unitId}
            />
          </Column>
          <Column lgSize={6}>
            <FormatReviewFormContainer
              expanded={this.state.expanded}
              reviewId={this.props.reviewId}
              unitId={this.props.unitId}
            />
          </Column>
        </Row>
      </Paper>
    );
  }
}
