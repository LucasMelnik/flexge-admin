import React from 'react';
import Separator from '../../../../core/layout/Separator';
import SchoolClassStudyQualityChart from '../common/SchoolClassStudyQualityChart';
import StudentStudyQualityChart from '../common/StudentStudyQualityChart';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import StudentStudiedDatesChart from '../common/StudentStudiedDatesChart';
import Alert from '../../../../core/layout/Alert';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import SchoolEnglishLevelChart from '../common/SchoolEnglishLevelChart';
import SchoolClassProgressChart from '../common/SchoolClassProgressChart';

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
          width: '31%',
          textAlign: 'center',
        }}
      >
        <Alert
          title="Nível de Inglês do Colégio"
          showIcon={false}
        >
          <div
            style={{
              display: 'inline-block',
              marginTop: 25,
              fontSize: 48,
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
        </Alert>
      </div>
      <div
        style={{
          width: '31%',
          textAlign: 'center',
        }}
      >
        <Alert
          title="Progresso médio por semestre"
          showIcon={false}
          type="success"
        >
          <div
            style={{
              display: 'inline-block',
              marginTop: 25,
              fontSize: 48,
            }}
          >
            0,91
          </div>
        </Alert>
      </div>
      <div
        style={{
          width: '31%',
          textAlign: 'center',
        }}
      >
        <Alert
          title="Projeção para B2"
          showIcon={false}
          type="success"
        >
          <div
            style={{
              display: 'inline-block',
              marginTop: 25,
              fontSize: 48,
            }}
          >
            4a e 2m
          </div>
        </Alert>
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
        <SchoolEnglishLevelChart />
      </div>
      <div
        style={{
          display: 'inline-block',
          width: '49%',
        }}
      >
        <SchoolClassProgressChart />
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
        <StudentStudiedTimeChart showDetails={false} />
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

export default MetricCharts;
