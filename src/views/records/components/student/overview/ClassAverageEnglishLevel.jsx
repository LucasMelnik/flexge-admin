import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import Tag from '../../../../../core/layout/Tag';
import Icon from '../../../../../core/layout/Icon';

const ClassAveageEnglishLevel = props => (
  <Tag
    color="none"
    style={{
      height: 'auto',
      padding: 10,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <span>Initial Level</span>
        <h1>{round(props.averageInitialEnglishLevel, 1).toFixed(1)} / {props.initialCourse}</h1>
      </div>
      <Icon
        name="arrow-right"
        style={{
          fontSize: 30,
          margin: '0 15px',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <span>Current Level</span>
        <h1>{round(props.averageCurrentEnglishLevel, 1).toFixed(1)} / {props.currentCourse}</h1>
      </div>
    </div>
  </Tag>
);

ClassAveageEnglishLevel.propTypes = {
  averageInitialEnglishLevel: PropTypes.number.isRequired,
  averageCurrentEnglishLevel: PropTypes.number.isRequired,
  initialCourse: PropTypes.string.isRequired,
  currentCourse: PropTypes.string.isRequired,
};

export default ClassAveageEnglishLevel;
