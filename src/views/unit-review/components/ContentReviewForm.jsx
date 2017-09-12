import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';

const ContentReviewForm = props => (
  <div>
    <div
      style={{
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      Revisão de conteúdo {props.values.statusFormat !== 'APPROVED' ? ('(Awaiting format review)') : props.values.status.replace('_', ' ')}
      <div
        style={{
          marginTop: props.values.status === 'DONE' && 36,
        }}
      >
        {(props.values.status === 'PENDING' && (props.values.createdBy !== localStorage.id || localStorage.role === 'ADMIN')) && (
          <div>
            <Button
              icon="fa-comments-o"
              type="primary"
              label="Mark as reviewed"
              onClick={props.onSendToReviewed}
              disabled={props.values.statusFormat !== 'APPROVED'}
            />
            {' '}
            <Button
              icon="fa-check-square-o"
              type="primary"
              label="Done"
              onClick={props.onSendToDone}
              disabled={props.values.statusFormat !== 'APPROVED'}
            />
          </div>
        )}
        {(props.values.status === 'REVIEWED' && (props.values.createdBy === localStorage.id || localStorage.role === 'ADMIN')) && (
          <Button
            icon="fa-comments-o"
            type="primary"
            label="Pending"
            onClick={props.onSendToPending}
            disabled={props.values.statusFormat !== 'APPROVED'}
          />
        )}
      </div>
    </div>
    <TextEditor
      style={{
        height: props.expanded ? 630 : 250,
        paddingBottom: 40,
        transition: 'all 0.5s',
      }}
      placeholder="Comment review..."
      isRequired
      readOnly={get(props.values, 'status', '') === 'DONE' || props.values.statusFormat !== 'APPROVED'}
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
