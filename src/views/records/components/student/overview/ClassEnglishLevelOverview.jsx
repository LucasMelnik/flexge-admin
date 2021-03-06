import React from 'react';
import PropTypes from 'prop-types';
import ClassAverageEnglishLevelContainer from './ClassAverageEnglishLevelContainer';

const ClassEnglishLevelOverview = props => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 630,
      margin: 'auto',
    }}
  >
    <ClassAverageEnglishLevelContainer
      schoolId={props.schoolId}
      classId={props.classId}
    />
    {/*<ClassSemiannualAverageEnglishLevelProgressContainer*/}
      {/*schoolId={props.schoolId}*/}
      {/*classId={props.classId}*/}
    {/*/>*/}
    {/*<B2ProjectionContainer />*/}
  </div>
);

ClassEnglishLevelOverview.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
};

export default ClassEnglishLevelOverview;
