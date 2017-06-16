import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../../core/form/TextInput';
import Row from "../../../../core/layout/Row";
import Column from "../../../../core/layout/Column";

const YoutubeLink = props => (
  <Row>
    <Column lgSize={8}>
      <TextInput
        floatingLabel
        fullWidth
        label="Youtube link"
        disabled={props.submitting}
        value={get(props.values, 'link', '')}
        onChange={value => props.onChange('link', value)}
        errorText={get(props.errors, 'link', '')}
      />
    </Column>
    {props.requiredCut && (
      <Column lgSize={2}>
        <TextInput
          floatingLabel
          fullWidth
          label="Start time"
          disabled={props.submitting}
          value={get(props.values, 'startTime', '')}
          onChange={value => props.onChange('startTime', value)}
          errorText={get(props.errors, 'startTime', '')}
        />
      </Column>
    )}
    {props.requiredCut && (
      <Column lgSize={2}>
        <TextInput
          floatingLabel
          fullWidth
          label="End time"
          disabled={props.submitting}
          value={get(props.values, 'endTime', '')}
          onChange={value => props.onChange('endTime', value)}
          errorText={get(props.errors, 'endTime', '')}
        />
      </Column>
    )}
  </Row>
);

YoutubeLink.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  requiredCut: PropTypes.bool,
};

YoutubeLink.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  requiredCut: false,
  onChange: () => false,
};

export default YoutubeLink;
