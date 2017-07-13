import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Button from '../../../core/form/Button';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import UnitFormContainer from '../../module/components/unit/UnitFormContainer';
import UnitItemListContainer from '../../module/components/unit/unit-item/UnitItemListContainer';
import ChangeStatusFormatContainer from './ChangeStatusFormatContainer';
import UnitItemsAccordionContainer from './UnitItemsAccordionContainer';

const ReviewFormScene = props => (
  <div style={{ paddingBottom: '320px' }}>
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
      {props.status === 'PENDING' && props.review.createdBy !== localStorage.id && (
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
    {(props.status === 'PENDING' && props.review.createdBy !== localStorage.id) || localStorage.role === 'ADMIN' ? (
      <UnitItemsAccordionContainer
        moduleId={props.moduleId}
        unitId={props.unitId}
      />
    ) : (
      <UnitItemListContainer
        unitId={props.unitId}
        moduleId={props.moduleId}
        reviewId={props.reviewId}
        status={props.status}
        isReadOnly={props.status === 'PENDING'}
      />
    )}
    <ColumnSeparator size="md" />
    <Paper
      style={{
        position: 'fixed',
        zIndex: 3,
        bottom: 0,
        left: 15,
        right: 15,
      }}
    >
      <Row>
        <Column lgSize={9}>
          <Paper>
            <TextInput
              floatingLabel
              multiLine
              disabled={props.status === 'REVIEWED' || props.status === 'DONE' || props.review.createdBy === localStorage.id}
              isRequired
              rows={5}
              label="Comment review"
              value={get(props.values, 'comments', '')}
              onChange={value => props.onChange('comments', value)}
              errorText={get(props.errors, 'comments', '')}
            />
          </Paper>
        </Column>
        <Column lgSize={3}>
          <ChangeStatusFormatContainer
            reviewId={props.reviewId}
            unitId={props.unitId}
            currentStatusFormat={props.currentStatusFormat}
          />
        </Column>
      </Row>
    </Paper>

  </div>
);

ReviewFormScene.propTypes = {
  unitId: PropTypes.string,
  moduleId: PropTypes.string,
  reviewId: PropTypes.string,
  values: PropTypes.object.isRequired,
  currentStatusFormat: PropTypes.string,
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
  currentStatusFormat: null,
};

export default ReviewFormScene;
