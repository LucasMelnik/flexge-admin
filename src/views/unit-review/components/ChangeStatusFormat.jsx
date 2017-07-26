import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import TextEditor from '../../../core/content/TextEditor';

const ChangeStatusFormat = (props) => {
  let optionsStatusFormat = [];
  if (localStorage.role === 'ADMIN') {
    optionsStatusFormat = ['APPROVED', 'NOT_APPROVED'];
  }
  if (localStorage.role === 'CONTENT_ADMIN' && props.currentStatusFormat === 'NOT_APPROVED') {
    optionsStatusFormat = ['PENDING_REVIEW'];
  }

  if (optionsStatusFormat.length) {
    return (
      <Row>
        <Column lgSize={8}>
          <div
            style={{
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Revisão de Formato
          </div>
          <div
            style={{
              height: props.expanded ? 800 : 230,
              transition: 'all 0.5s',
            }}
          >
            <TextEditor
              style={{
                height: props.expanded ? 700 : 200,
              }}
              placeholder="Comment status format review..."
              isRequired
              readOnly={localStorage.role !== 'ADMIN'}
              value={get(props.values, 'commentsStatusFormat', '')}
              onChange={value => props.onChange('commentsStatusFormat', value)}
            />
          </div>
        </Column>
        <Column lgSize={4}>
          <div style={{ marginBottom: 27 }} />
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
        </Column>
      </Row>
    );
  }
  return null;
};

ChangeStatusFormat.propTypes = {
  expanded: PropTypes.bool.isRequired,
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
