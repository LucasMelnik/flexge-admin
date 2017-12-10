import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityChartContainer from '../common/metrics/StudyQualityChartContainer';
import StudyQualityGroupChartContainer from '../common/metrics/StudyQualityGroupChartContainer';
import StudiedTimeChartContainer from '../common/metrics/StudiedTimeChartContainer';
import ActiveStudentsByPeriodChartContainer from '../common/metrics/ActiveStudentsByPeriodChartContainer';
import EnglishLevelByPeriodChartContainer from '../common/metrics/EnglishLevelByPeriodChartContainer';
import SchoolClassProgressChart from '../common/metrics/SchoolClassProgressChart';
import MetricStatusCard from '../common/metrics/MetricStatusCard';
import AverageEnglishLevelContainer from '../common/metrics/AverageEnglishLevelContainer';

const MetricCharts = () => (
  <div>
    <h2>Metrics</h2>
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
        <AverageEnglishLevelContainer />
      </div>
      <div
        style={{
          width: '33%',
          textAlign: 'center',
        }}
      >
        <MetricStatusCard status="normal">
          <p>Semiannual Average Progress</p>
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
          <p>B2 Projection</p>
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
        <EnglishLevelByPeriodChartContainer />
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
        <StudyQualityChartContainer />
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
        <StudiedTimeChartContainer showDetails={false} />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '33%',
        }}
      >
        <ActiveStudentsByPeriodChartContainer showDetails={false} />
      </div>
    </div>
  </div>
);

export default MetricCharts;
