import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import FloatActionButton from '../../../core/form/FloatActionButton';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Paper from '../../../core/layout/Paper';
import TextEditor from '../../../core/content/TextEditor';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer';
import ChangeStatusFormatContainer from './ChangeStatusFormatContainer';
import ReviewItems from './ReviewItems';

export default class ReviewFormScene extends Component {

  state = {
    expanded: false,
  }

  static propTypes = {
    unitId: PropTypes.string,
    moduleId: PropTypes.string,
    reviewId: PropTypes.string,
    values: PropTypes.object.isRequired,
    currentStatusFormat: PropTypes.string,
    status: PropTypes.string.isRequired,
    review: PropTypes.shape({
      createdBy: PropTypes.string,
    }),
  };

  static defaultProps = {
    unitId: null,
    moduleId: null,
    reviewId: null,
    comments: null,
    review: {},
    currentStatusFormat: null,
  };

  expandOrRetractComment = () => {
    if (this.state.expanded) {
      this.setState({
        expanded: false,
      });
    } else {
      this.setState({
        expanded: true,
      });
    }
  }

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
          {' '}
          {this.props.status === 'PENDING' && this.props.review.createdBy !== localStorage.id && (
            <Button
              icon="rate_review"
              primary
              label="Mark as reviewed"
              onClick={() => this.props.onSendToReviewed(this.props.unitId, this.props.reviewId)}
            />
          )}
          {this.props.status === 'REVIEWED' && this.props.review.createdBy === localStorage.id && (
            <Button
              icon="rate_review"
              primary
              label="Done"
              onClick={() => this.props.onSendToDone(this.props.unitId, this.props.reviewId)}
            />
          )}
        </InlineBlock>
        <UnitFormContainer
          unitId={this.props.unitId}
          moduleId={this.props.moduleId}
          reviewId={this.props.reviewId}
          disabled={(this.props.currentStatusFormat === 'PENDING' || this.props.currentStatusFormat === 'PENDING_REVIEW') &&
            (this.props.status === 'PENDING' || (this.props.status === 'REVIEWED' && this.props.review.createdBy !== localStorage.id))}
        />
        <Separator size="xs" />
        <ReviewItems
          unitId={this.props.unitId}
          moduleId={this.props.moduleId}
          review={this.props.review}
          status={this.props.status}
          statusFormat={this.props.currentStatusFormat}
        />
        <ColumnSeparator size="md" />
        <Paper
          style={{
            position: 'fixed',
            zIndex: 3,
            bottom: 0,
            left: 0,
            right: 0,
            height: this.state.expanded ? 800 : 300,
            maxHeight: '87%',
          }}
        >

          <FloatActionButton
            style={{
              position: 'absolute',
              right: 35,
              top: -20,
            }}
            icon={this.state.expanded ? 'arrow_downward' : 'arrow_upward'}
            primary
            onClick={this.expandOrRetractComment}
          />
          <Row>
            <Column lgSize={5}>
              <div
                style={{
                  fontSize: 16,
                  marginBottom: 10,
                }}
              >
                  Revisão de conteúdo
                </div>
              <div
                style={{
                  height: this.state.expanded ? 800 : 220,
                  transition: 'all 0.5s',
                }}
              >
                <TextEditor
                  style={{
                    height: this.state.expanded ? 700 : 180,
                  }}
                  placeholder="Comment review..."
                  isRequired
                  readOnly={this.props.status === 'REVIEWED' || this.props.status === 'DONE' || this.props.review.createdBy === localStorage.id}
                  value={get(this.props.values, 'comments', '')}
                  onChange={value => this.props.onChange('comments', value)}
                />
              </div>
            </Column>
            <Column lgSize={7}>
              <ChangeStatusFormatContainer
                expanded={this.state.expanded}
                reviewId={this.props.reviewId}
                unitId={this.props.unitId}
                currentStatusFormat={this.props.currentStatusFormat}
              />
            </Column>
          </Row>
        </Paper>
      </div>
    );
  }
}
