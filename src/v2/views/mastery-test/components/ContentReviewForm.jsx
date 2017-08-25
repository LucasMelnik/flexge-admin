import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';

const ContentReviewForm = props => (
  <div>
    <div
      style={{
        fontSize: 16,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      Revisão de conteúdo {props.values.review && props.values.review.statusFormat !== 'APPROVED' && ('(Awaiting format review)')}
      <div
        style={{
          marginTop: props.values.review && props.values.review.statusContent === 'DONE' && 36,
        }}
      >
        {((props.values.review && props.values.review.statusContent === 'PENDING') || localStorage.role === 'ADMIN') && (
          <div>
            <Button
              icon="fa-times-circle"
              label="Content Reproved"
              onClick={props.onSendToNotApproved}
              disabled={props.values.review && props.values.review.statusFormat !== 'APPROVED'}
            />
            {' '}
            <Button
              icon="fa-check-square"
              type="primary"
              label="Content Approved"
              onClick={props.onSendToApproved}
              disabled={props.values.review && props.values.review.statusFormat !== 'APPROVED'}
            />
          </div>
        )}
        {(props.values.review && props.values.review.statusContent === 'NOT_APPROVED' && (props.values.createdBy === localStorage.id || localStorage.role === 'ADMIN')) && (
          <Button
            icon="fa-comments-o"
            type="primary"
            label="Pending"
            onClick={props.onSendToPending}
            disabled={props.values.review && props.values.review.statusFormat !== 'APPROVED'}
          />
        )}
      </div>
    </div>
    <TextEditor
      style={{
        height: props.expanded ? 600 : 220,
        transition: 'all 0.5s',
      }}
      placeholder="Comment review..."
      isRequired
      readOnly={get(props.values, 'review.statusContent', '') === 'APPROVED' || get(props.values, 'review.statusFormat', '') !== 'APPROVED'}
      value={get(props.values, 'review.contentComments', '')}
      onChange={value => props.onChange('review.contentComments', value)}
    />
  </div>
);

ContentReviewForm.propTypes = {
  onSendToPending: PropTypes.func.isRequired,
  onSendToNotApproved: PropTypes.func.isRequired,
  onSendToApproved: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContentReviewForm;
