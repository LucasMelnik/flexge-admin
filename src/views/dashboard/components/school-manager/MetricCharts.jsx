import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudyQualityChartContainer from '../common/metrics/StudyQualityChartContainer';
import StudyQualityGroupChartContainer from '../common/metrics/StudyQualityGroupChartContainer';
import StudiedTimeChartContainer from '../common/metrics/StudiedTimeChartContainer';
import ActiveStudentsByPeriodChartContainer from '../common/metrics/ActiveStudentsByPeriodChartContainer';
import EnglishLevelByPeriodChartContainer from '../common/metrics/EnglishLevelByPeriodChartContainer';
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
          width: '100%',
          textAlign: 'center',
        }}
      >
        <AverageEnglishLevelContainer />
      </div>
      {/*<div*/}
        {/*style={{*/}
          {/*width: '33%',*/}
          {/*textAlign: 'center',*/}
        {/*}}*/}
      {/*>*/}
        {/*<SemiannualAverageProgressContainer />*/}
      {/*</div>*/}
      {/*<div*/}
        {/*style={{*/}
          {/*width: '33%',*/}
          {/*textAlign: 'center',*/}
        {/*}}*/}
      {/*>*/}
        {/*<B2ProjectionContainer />*/}
      {/*</div>*/}
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
          width: '45%',
        }}
      >
        <EnglishLevelByPeriodChartContainer />
      </div>
      {/*<div*/}
        {/*style={{*/}
          {/*display: 'inline-block',*/}
          {/*width: '33%',*/}
        {/*}}*/}
      {/*>*/}
        {/*<SemiannualEnglishLevelProgressChartContainer />*/}
      {/*</div>*/}
      <div
        style={{
          display: 'inline-block',
          width: '45%',
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
