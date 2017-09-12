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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      Revisão de Formato ({props.values.statusFormat && props.values.statusFormat.replace('_', ' ')})
      <div
        style={{
          marginTop: (localStorage.role === 'CONTENT_ADMIN' && props.values.statusFormat === 'APPROVED') && 36,
        }}
      >
        {localStorage.role === 'ADMIN' && (
          <div>
            <Button
              label="Format Approved"
              icon="fa-smile-o"
              type="primary"
              onClick={() => {
                props.onChange('statusFormat', 'APPROVED');
                props.onSaveStatusFormat();
              }}
            />
            {' '}
            <Button
              label="Format Not Approved"
              icon="fa-frown-o"
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
              icon="fa-send"
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
        height: props.expanded ? 630 : 250,
        paddingBottom: 40,
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
