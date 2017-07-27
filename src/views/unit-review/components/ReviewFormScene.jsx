import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer';
import ReviewFormControlBar from './ReviewFormBar';
import ReviewItems from './ReviewItems';

export default class ReviewFormScene extends Component {

  static propTypes = {
    unit: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    moduleId: PropTypes.string.isRequired,
    review: PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdBy: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <div style={{ paddingBottom: '360px' }}>
        <InlineBlock marginBottom={15}>
          <Title>
            Unit
          </Title>
        </InlineBlock>
        <InlineBlock
          float="right"
        >
          <Button
            icon="keyboard_backspace"
            label="back"
            onClick={() => browserHistory.push('/reviews')}
          />
        </InlineBlock>
        <UnitFormContainer
          unitId={this.props.unit.id}
          moduleId={this.props.moduleId}
          reviewId={this.props.reviewId}
          disabled={(this.props.review.currentStatusFormat === 'PENDING' || this.props.review.currentStatusFormat === 'PENDING_REVIEW') &&
            (this.props.review.status === 'PENDING' || (this.props.review.status === 'REVIEWED' && this.props.review.createdBy !== localStorage.id))}
        />
        <Separator size="sm" />
        <ReviewItems
          unit={this.props.unit}
          moduleId={this.props.moduleId}
          review={this.props.review}
        />
        <ColumnSeparator size="md" />
        <ReviewFormControlBar
          unitId={this.props.unit.id}
          reviewId={this.props.review.id}
        />
      </div>
    );
  }
}
