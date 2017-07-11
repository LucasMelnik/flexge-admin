import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';

const ChangeStatusFormat = (props) => {
  let optionsStatusFormat = [];
  if (localStorage.role === 'ADMIN' && (props.currentStatusFormat === 'PENDING' || props.currentStatusFormat === 'PENDING_REVIEW')) {
    optionsStatusFormat = ['APPROVED', 'NOT_APPROVED'];
  }
  if (localStorage.role === 'CONTENT_ADMIN' && props.currentStatusFormat === 'NOT_APPROVED') {
    optionsStatusFormat = ['PENDING_REVIEW'];
  }
  if (optionsStatusFormat.length) {
    return (
      <Paper>
        <Select
          floatingLabel
          options={optionsStatusFormat.map(value => ({
            value,
            label: value.replace('_', ' '),
          }))}
          label="Status format"
          isRequired
          value={get(props.values, 'statusFormat', '')}
          onChange={value => props.onChange('statusFormat', value)}
          errorText={get(props.errors, 'statusFormat', '')}
        />
        <Button
          label="Save"
          style={{
            verticalAlign: 'top',
            marginLeft: 10,
            marginTop: 28,
          }}
          primary
          onClick={() => props.onSaveStatusFormat(props.unitId, props.reviewId)}
        />
      </Paper>
    );
  }
  return null;
};

ChangeStatusFormat.propTypes = {
  unitId: PropTypes.string,
  reviewId: PropTypes.string,
  onSaveStatusFormat: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  currentStatusFormat: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

ChangeStatusFormat.defaultProps = {
  unitId: null,
  reviewId: null,
  comments: null,
  errors: null,
  onChange: null,
  currentStatusFormat: null,
};

export default ChangeStatusFormat;
