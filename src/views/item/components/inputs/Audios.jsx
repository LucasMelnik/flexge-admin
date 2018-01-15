import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AudioPreview from '../../../../core/layout/AudioPreview';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';

const Audios = props => (
  <Row>
    {get(props.values, 'generatedAudio', null) && (
      <Column size={2}>
        <p>Generated Audio</p>
        <AudioPreview src={get(props.values, 'generatedAudio', '')} />
      </Column>
    )}
    {get(props.values, 'audio', null) && (
      <Column size={2}>
        <p>Native Audio</p>
        <AudioPreview src={get(props.values, 'audio', '')} />
      </Column>
    )}
  </Row>
);

Audios.propTypes = {
  values: PropTypes.object,
};

Audios.defaultProps = {
  values: null,
};

export default Audios;
