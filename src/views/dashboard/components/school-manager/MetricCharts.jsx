import React from 'react';
import Separator from '../../../../core/layout/Separator';
import SchoolClassStudyQualityChart from '../common/SchoolClassStudyQualityChart';
import StudentStudyQualityChart from '../common/StudentStudyQualityChart';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import StudentStudiedDatesChart from '../common/StudentStudiedDatesChart';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import SchoolEnglishLevelChart from '../common/SchoolEnglishLevelChart';
import SchoolClassProgressChart from '../common/SchoolClassProgressChart';
import MetricStatusCard from '../common/MetricStatusCard';

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
        <SchoolClassProgressChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <SchoolClassStudyQualityChart />
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
        <StudentStudyQualityChart />
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
        <StudentStudiedDatesChart showDetails={false} />
      </div>
    </div>
  </div>
);

export default MetricCharts;
