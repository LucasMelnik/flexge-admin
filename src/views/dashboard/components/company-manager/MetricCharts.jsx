import React from 'react';
import Separator from '../../../../core/layout/Separator';
import StudentStudyQualityChart from '../common/StudentStudyQualityChart';
import StudentStudiedTimeChart from '../common/StudentStudiedTimeChart';
import StudentStudiedDatesChart from '../common/StudentStudiedDatesChart';
import Alert from '../../../../core/layout/Alert';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import SchoolEnglishLevelChart from '../common/SchoolEnglishLevelChart';
import SchoolProgressChart from '../common/SchoolProgressChart';
import SchoolStudyQualityChart from '../common/SchoolStudyQualityChart';

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
          width: '24%',
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
          width: '24%',
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
          width: '24%',
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
            4 anos e 2 meses
          </div>
        </Alert>
      </div>
      <div
        style={{
          width: '24%',
          textAlign: 'center',
        }}
      >
        <Alert
          title="Ranking por Instituição"
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
            3 lugar
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
        <SchoolProgressChart />
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
        <SchoolStudyQualityChart />
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

export default MetricCharts;
