import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityGroupChartContainer from '../common/StudyQualityGroupChartContainer';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import ActiveStudentsByWeekChart from '../common/ActiveStudentsByWeekChart';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import SchoolEnglishLevelChart from '../common/SchoolEnglishLevelChart';
import SchoolProgressChart from '../common/SchoolProgressChart';
import MetricStatusCard from '../common/MetricStatusCard';
import StudyQualityScoreChartContainer from '../common/StudyQualityScoreChartContainer';

const MetricCharts = () => (
  <div>
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
          width: '33%',
          textAlign: 'center',
        }}
      >
        <MetricStatusCard status="bad">
          <p>Nível de Inglês do Colégio</p>
          <Separator size="xs" />
          <div
            style={{
              display: 'inline-block',
              fontSize: 48,
              lineHeight: '48px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
              }}
            >
              1.29
            </div>
            <ColumnSeparator size="lg" />
            <div
              style={{
                display: 'inline-block',
              }}
            >
              A1
            </div>
          </div>
        </MetricStatusCard>
      </div>
      <div
        style={{
          width: '33%',
          textAlign: 'center',
        }}
      >
        <MetricStatusCard status="normal">
          <p>Progresso médio por semestre</p>
          <Separator size="xs" />
          <div
            style={{
              display: 'inline-block',
              fontSize: 48,
              lineHeight: '48px',
            }}
          >
            0,91
          </div>
        </MetricStatusCard>
      </div>
      <div
        style={{
          width: '33%',
          textAlign: 'center',
        }}
      >
        <MetricStatusCard
          status="good"
        >
          <p>Projeção para B2</p>
          <Separator size="xs" />
          <div
            style={{
              display: 'inline-block',
              fontSize: 48,
              lineHeight: '48px',
            }}
          >
            4a e 2m
          </div>
        </MetricStatusCard>
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
          width: '33%',
        }}
      >
        <SchoolEnglishLevelChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <SchoolProgressChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <StudyQualityScoreChartContainer />
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
          width: '33%',
        }}
      >
        <StudyQualityGroupChartContainer />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <StudentStudiedTimeChart showDetails={false} />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <ActiveStudentsByWeekChart showDetails={false} />
      </div>
    </div>
  </div>
);

export default MetricCharts;
