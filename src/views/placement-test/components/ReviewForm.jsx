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
      <p>Revisão de Placement ({props.values.status === 'PENDING' && 'Awaiting Approval'})</p>
      <div>
        {localStorage.role === 'ADMIN' && (
          <div>
            <Button
              label="Approved"
              icon="fa-smile-o"
              type="primary"
              onClick={() => {
                props.onChange('status', 'APPROVED');
                props.onSaveStatus();
              }}
            />
            {' '}
            <Button
              label="Not Approved"
              icon="fa-frown-o"
              onClick={() => {
                props.onChange('status', 'NOT_APPROVED');
                props.onSaveStatus();
              }}
            />
          </div>
        )}
        {(localStorage.role === 'CONTENT_ADMIN' && props.values.status === 'NOT_APPROVED') && (
          <div>
            <Button
              label="Send to review"
              icon="fa-send"
              primary
              onClick={() => {
                props.onChange('status', 'PENDING');
                props.onSaveStatus();
              }}
            />
          </div>
        )}
      </div>
    </div>
    <TextEditor
      placeholder="Comment review..."
      isRequired
      readOnly={props.values.status === 'PENDING' && localStorage.role === 'CONTENT_ADMIN'}
      value={get(props.values, 'comments', '')}
      onChange={value => props.onChange('comments', value)}
    />
  </div>
);

FormatReviewForm.propTypes = {
  onSaveStatus: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

FormatReviewForm.defaultProps = {
  errors: null,
  onChange: null,
};

export default FormatReviewForm;
