import React from 'react';
import Separator from '../../../../core/layout/Separator';
import Metrics from './Metrics';
import SchoolClassStudyQualityChart from './SchoolClassStudyQualityChart';
import StudentStudyQualityChart from './StudentStudyQualityChart';
import StudentStudiedTimeChart from './StudentStudiedTimeChart';
import StudentStudiedDatesChart from './StudentStudiedDatesChart';

const TeacherDashboard = () => (
  <div>
    <Separator />
    <h1>Welcome back Stacey Rodrigues.</h1>
    <Separator />
    <Metrics />
    <Separator />
    <h1>Estas são suas metricas.</h1>
    <Separator />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: '49%',
        }}
      >
        <SchoolClassStudyQualityChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '49%',
        }}
      >
        <StudentStudyQualityChart />
      </div>
    </div>
    <Separator />
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          width: '49%',
        }}
      >
        <StudentStudiedTimeChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '49%',
        }}
      >
        <StudentStudiedDatesChart />
      </div>
    </div>
  </div>
);

export default TeacherDashboard;
