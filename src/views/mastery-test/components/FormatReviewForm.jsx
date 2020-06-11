import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

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
          marginTop: (localStorage.role === Roles.CONTENT_ADMIN && get(props.values, 'review.statusFormat', '') === 'APPROVED') && 36,
        }}
      >
        <PermissionValidator allowedFor={[Roles.ADMIN]}>
          <div>
            <Button
              label="Format Approved"
              icon="smile-o"
              type="primary"
              onClick={() => {
                props.onChange('review.statusFormat', 'APPROVED');
                props.onSaveStatusFormat();
              }}
            />
            {' '}
            <Button
              label="Format Not Approved"
              icon="frown-o"
              onClick={() => {
                props.onChange('review.statusFormat', 'NOT_APPROVED');
                props.onSaveStatusFormat();
              }}
            />
          </div>
        </PermissionValidator>
        {(localStorage.role === Roles.CONTENT_ADMIN && get(props.values, 'review.statusFormat', '') === 'NOT_APPROVED') && (
          <div>
            <Button
              label="Send to format review"
              icon="export"
              primary
              onClick={() => {
                props.onChange('review.statusFormat', 'PENDING');
                props.onSaveStatusFormat();
              }}
            />
          </div>
        )}
      </div>
    </div>
    <TextEditor
      style={{
        height: 240,
        transition: 'all 0.5s',
      }}
      placeholder="Comment status format review..."
      isRequired
      readOnly={![Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && props.values.createdBy !== localStorage.id}
      value={get(props.values, 'review.formatComments', '')}
      onChange={value => props.onChange('review.formatComments', value)}
    />
  </div>
);

FormatReviewForm.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onSaveStatusFormat: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

FormatReviewForm.defaultProps = {
  errors: null,
  onChange: null,
};

export default FormatReviewForm;
