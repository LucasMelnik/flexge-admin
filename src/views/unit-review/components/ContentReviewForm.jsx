import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextEditor from '../../../core/content/TextEditor';
import Button from '../../../core/form/Button';

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
      Revisão de conteúdo
      <div>
        {(get(props.values, 'status', '') === 'PENDING' && (get(props.values, 'createdBy', '') !== localStorage.id || localStorage.role === 'ADMIN')) && (
          <div>
            <Button
              icon="rate_review"
              primary
              label="Mark as reviewed"
              onClick={props.onSendToReviewed}
            />
            {' '}
            <Button
              icon="rate_review"
              primary
              label="Done"
              onClick={props.onSendToDone}
            />
          </div>
        )}
        {(get(props.values, 'status', '') === 'REVIEWED' && (get(props.values, 'createdBy', '') === localStorage.id || localStorage.role === 'ADMIN')) && (
          <Button
            icon="rate_review"
            primary
            label="Pending"
            onClick={props.onSendToPending}
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
      readOnly={get(props.values, 'status', '') === 'DONE'}
      value={get(props.values, 'comments', '')}
      onChange={value => props.onChange('comments', value)}
    />
  </div>
);

ContentReviewForm.propTypes = {
  onSendToPending: PropTypes.func.isRequired,
  onSendToReviewed: PropTypes.func.isRequired,
  onSendToDone: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContentReviewForm;
