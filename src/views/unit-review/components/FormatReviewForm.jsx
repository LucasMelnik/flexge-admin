import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/content/TextEditor';

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
      Revisão de Formato
      <div
        style={{
          marginTop: (localStorage.role === 'CONTENT_ADMIN' && props.values.statusFormat === 'APPROVED') && 36,
        }}
      >
        {localStorage.role === 'ADMIN' && (
          <div>
            <Button
              label="Format Approved"
              icon="sentiment_very_satisfied"
              primary
              onClick={() => {
                props.onChange('statusFormat', 'APPROVED');
                props.onSaveStatusFormat();
              }}
            />
            {' '}
            <Button
              label="Format Not Approved"
              icon="sentiment_very_dissatisfied"
              onClick={() => {
                props.onChange('statusFormat', 'NOT_APPROVED');
                props.onSaveStatusFormat();
              }}
            />
          </div>
        )}
        {(localStorage.role === 'CONTENT_ADMIN' && props.values.statusFormat === 'NOT_APPROVED') && (
          <div>
            <Button
              label="Send to format review"
              icon="assignment"
              primary
              onClick={() => {
                props.onChange('statusFormat', 'PENDING_REVIEW');
                props.onSaveStatusFormat();
              }}
            />
          </div>
        )}
      </div>
    </div>
    <TextEditor
      style={{
        height: props.expanded ? 600 : 220,
        transition: 'all 0.5s',
      }}
      placeholder="Comment status format review..."
      isRequired
      readOnly={localStorage.role !== 'ADMIN' && props.values.createdBy !== localStorage.id}
      value={get(props.values, 'commentsStatusFormat', '')}
      onChange={value => props.onChange('commentsStatusFormat', value)}
    />
  </div>
);

FormatReviewForm.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onSaveStatusFormat: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  currentStatusFormat: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

FormatReviewForm.defaultProps = {
  comments: null,
  errors: null,
  onChange: null,
  currentStatusFormat: null,
};

export default FormatReviewForm;
