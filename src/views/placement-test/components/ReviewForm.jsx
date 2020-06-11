import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';
import { Roles } from '../../../core/util';

const FormatReviewForm = props => (
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
        {[Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && (
          <div>
            <Button
              label="Approved"
              icon="smile-o"
              type="primary"
              onClick={() => {
                props.onChange('status', 'APPROVED');
                props.onSaveStatus();
              }}
            />
            {' '}
            <Button
              label="Not Approved"
              icon="frown-o"
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
              icon="export"
              type="primary"
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
  onChange: PropTypes.func,
};

FormatReviewForm.defaultProps = {
  onChange: null,
};

export default FormatReviewForm;
