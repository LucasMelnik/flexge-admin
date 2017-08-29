import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import MaskInput from '../../../../core/form/MaskInput';

const VideoInput = props => (
  <div>
    <Row>
      <Column lgSize={8}>
        <TextInput
          label="Youtube link"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'videoLink', '')}
          onChange={value => props.onChange('videoLink', value)}
          description={get(props.errors, 'videoLink', '')}
          fieldValidation={get(props.errors, 'videoLink', null) && 'error'}
        />
      </Column>
      {props.requiredCut && (
        <Column lgSize={2}>
          <MaskInput
            label="Start time (example 01:23)"
            disabled={props.submitting || props.disabled}
            value={get(props.values, 'videoStartTime', '')}
            onChange={value => props.onChange('videoStartTime', value)}
            description={get(props.errors, 'videoStartTime', '')}
            fieldValidation={get(props.errors, 'videoStartTime', null) && 'error'}
            delimiters={[':']}
            blocks={[2, 2]}
            numericOnly
          />
        </Column>
      )}
      {props.requiredCut && (
        <Column lgSize={2}>
          <MaskInput
            floatingLabel
            fullWidth
            label="End time (example 01:23)"
            disabled={props.submitting || props.disabled}
            value={get(props.values, 'videoEndTime', '')}
            onChange={value => props.onChange('videoEndTime', value)}
            description={get(props.errors, 'videoEndTime', '')}
            fieldValidation={get(props.errors, 'videoEndTime', null) && 'error'}
            delimiters={[':']}
            blocks={[2, 2]}
            numericOnly
          />
        </Column>
      )}
    </Row>
    <Row>
      <Column lgSize={12}>
        <TextInput
          label="Reference (example: Universal; Harry Potter e o Prisioneiro de Azkaban (2004))"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'reference', '')}
          onChange={value => props.onChange('reference', value)}
          description={get(props.errors, 'reference', '')}
          fieldValidation={get(props.errors, 'reference', null) && 'error'}
        />
      </Column>
    </Row>
  </div>
);

VideoInput.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  requiredCut: PropTypes.bool,
  disabled: PropTypes.bool,
};

VideoInput.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  requiredCut: false,
  onChange: () => false,
  disabled: false,
};

export default VideoInput;
