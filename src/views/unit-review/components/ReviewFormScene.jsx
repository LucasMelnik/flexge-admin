import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer'
import UnitItemListContainer from '../../module/components/unit/unit-item/UnitItemListContainer'

const ReviewFormScene = props => (
  <div>
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
      {props.status === 'PENDING' && (
        <Button
          icon="rate_review"
          primary
          label="Mark as reviewed"
          onClick={() => props.onSendToReviewed(props.unitId, props.reviewId)}
        />
      )}
      {props.status === 'REVIEWED' && props.review.createdBy === localStorage.id && (
        <Button
          icon="rate_review"
          primary
          label="Done"
          onClick={() => props.onSendToDone(props.unitId, props.reviewId)}
        />
      )}
    </InlineBlock>
    <UnitFormContainer
      unitId={props.unitId}
      moduleId={props.moduleId}
      reviewId={props.reviewId}
      disabled={props.status === 'PENDING' || (props.status === 'REVIEWED' && props.review.createdBy !== localStorage.id)}
    />
    <Separator size="xs" />
    <Title>
      Unit items
    </Title>
    <Separator size="xs" />
    <UnitItemListContainer
      unitId={props.unitId}
      moduleId={props.moduleId}
      reviewId={props.reviewId}
      status={props.status}
      disabled={props.status === 'PENDING' || (props.status === 'REVIEWED' && props.review.createdBy !== localStorage.id)}
      isReadOnly={props.status === 'PENDING'}
    />
    <Separator size="xs" />
    <Paper >
      <TextInput
        floatingLabel
        fullWidth
        multiLine
        disabled={props.status === 'REVIEWED' || props.status === 'DONE'}
        isRequired
        rows={7}
        label="Comment review"
        value={props.comments}
        onChange={value => props.onChange('comments', value)}
        errorText={get(props.errors, 'comments', '')}
      />
    </Paper>
  </div>
);

ReviewFormScene.propTypes = {
  unitId: PropTypes.string,
  moduleId: PropTypes.string,
  reviewId: PropTypes.string,
  comments: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  errors: PropTypes.object,
  review: PropTypes.shape({
    createdBy: PropTypes.string,
  }),
};

ReviewFormScene.defaultProps = {
  unitId: null,
  moduleId: null,
  reviewId: null,
  comments: null,
  errors: null,
  review: {},
};

export default ReviewFormScene;
