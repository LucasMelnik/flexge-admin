import React from 'react';
import PropTypes from 'prop-types';
import Tag from '../../../../../core/layout/Tag';

const ClassSemiannualAverageEnglishLevelProgress = props => (
  <Tag
    color="none"
    style={{
      height: 'auto',
      padding: 10,
      textAlign: 'center',
    }}
  >
    <span>Semiannual Progress</span>
    <br />
    <h1>{!!props.progress ? props.progress : '-'}</h1>
  </Tag>
);

ClassSemiannualAverageEnglishLevelProgress.propTypes = {
  progress: PropTypes.number,
};

ClassSemiannualAverageEnglishLevelProgress.defaultProps = {
  progress: null,
};

export default ClassSemiannualAverageEnglishLevelProgress;
