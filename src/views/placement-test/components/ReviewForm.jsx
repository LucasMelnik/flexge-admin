import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';

const FormatReviewForm = (props) => (
  <div>
    <div
      style={{
        marginBottom: 10,
        marginRight: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p>Revisão de Placement</p>
      <div>
        {localStorage.role === 'ADMIN' && (
          <div>
            <Button
              label="Approved"
              icon="fa-smile-o"
              type="primary"
              onClick={() => {
                props.onChange('review.status', 'APPROVED');
                props.onSaveStatus();
              }}
            />
            {' '}
            <Button
              label="Not Approved"
              icon="fa-frown-o"
              onClick={() => {
                props.onChange('review.status', 'NOT_APPROVED');
                props.onSaveStatus();
              }}
            />
          </div>
        )}
        {(localStorage.role === 'CONTENT_ADMIN' && (!props.values.review || props.values.review.status === 'NOT_APPROVED')) && (
          <div>
            <Button
              label="Send to review"
              icon="fa-send"
              primary
              onClick={() => {
                props.onChange('review.status', 'PENDING');
                props.onSaveStatus();
              }}
            />
          </div>
        )}
      </div>
    </div>
    <TextEditor
      style={{
        height: props.expanded ? 600 : 200,
        transition: 'all 0.5s',
      }}
      placeholder="Comment review..."
      isRequired
      readOnly={localStorage.role !== 'ADMIN' && props.values.createdBy !== localStorage.id}
      value={get(props.values, 'review.comments', '')}
      onChange={value => props.onChange('review.comments', value)}
    />
  </div>
);

FormatReviewForm.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onSaveStatus: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

FormatReviewForm.defaultProps = {
  comments: null,
  errors: null,
  onChange: null,
};

export default FormatReviewForm;
