import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import findLast from 'lodash/findLast';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import { englishLevelCourses } from '../../../../core/consts';

const ClassEnglishLevelOverview = (props) => {
  if (!props.students || !props.students.length) return null;
  const averageInitialEnglishLevel = props.students.filter(student => student.initialEnglishLevel).reduce((acc, student) => (
    acc + student.initialEnglishLevel), 0) / props.students.length;
  const averageCurrentEnglishLevel = props.students.filter(student => student.currentEnglishLevel).reduce((acc, student) => (
    acc + student.currentEnglishLevel), 0) / props.students.length;
  const initialCourse = findLast(englishLevelCourses, course => course.value <= averageInitialEnglishLevel);
  const currentCourse = findLast(englishLevelCourses, course => course.value <= averageCurrentEnglishLevel);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 630,
        margin: 'auto',
      }}
    >
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
            <h1>{round(averageInitialEnglishLevel, 1).toFixed(1)} / {initialCourse.label}</h1>
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
            <h1>{round(averageCurrentEnglishLevel, 1).toFixed(1)} / {currentCourse.label}</h1>
          </div>
        </div>
      </Tag>
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
        <h1>-</h1>
      </Tag>
      <Tag
        color="none"
        style={{
          height: 'auto',
          padding: 10,
          textAlign: 'center',
        }}
      >
        <span>B2 Projection</span>
        <br />
        <h1> - </h1>
      </Tag>
    </div>
  )
}

ClassEnglishLevelOverview.propTypes = {
  students: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ClassEnglishLevelOverview;
