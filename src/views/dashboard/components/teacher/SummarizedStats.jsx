import React from 'react';
import CircularProgress from '../../../../core/layout/CircularProgress';

const SummarizedStats = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
    }}
  >
    <CircularProgress
      title="Study Quality da suas turmas"
      value={13.4}
      max={15}
      legend="School average 12.7"
    />
    <CircularProgress
      title="Alunos ativos com SQ acima de 5"
      value={34}
      max={100}
      valueRender={value => `${value}%`}
      legend="School average 32%"
    />
    <CircularProgress
      title="Total de alunos ativos"
      value={74}
      max={100}
      valueRender={value => `${value}%`}
      legend="School average 55%"
    />
    <CircularProgress
      title="Alunos que estudaram nos últimos 7 dias"
      value={63}
      max={100}
      valueRender={value => `${value}%`}
      legend="School average 60%"
    />
    <CircularProgress
      title="Alunos ativos com mais de 2hrs de estudos nos últimos 7 dias"
      value={91}
      max={100}
      valueRender={value => `${value}%`}
      legend="School average 80%"
    />
    <CircularProgress
      title="Média de horas por aluno na última semana"
      value={60}
      max={100}
      valueRender={() => '01:53'}
      legend="School average 01:13"
    />
  </div>
);

export default SummarizedStats;
