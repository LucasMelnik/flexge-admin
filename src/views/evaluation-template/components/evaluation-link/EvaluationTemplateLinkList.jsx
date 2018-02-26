import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import FetchSelect from '../../../../core/form/FetchSelect';
import Select from '../../../../core/form/Select';

const EvaluationTemplateLinkList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'School',
        path: 'school.name',
        sort: true,
      },
      {
        label: 'Classroom',
        path: 'name',
        sort: true,
      },
      {
        label: 'Weekly hours required',
        path: 'weeklyHoursRequired',
        width: '200px',
        render: (value, row) => (
          <Select
            label=""
            required
            placeholder="Select hours"
            value={value}
            onChange={hours => props.onChange('weeklyHoursRequired', hours, row)}
            options={[
              {
                label: '1h',
                value: 1,
              },
              {
                label: '1,5h',
                value: 1.5,
              },
              {
                label: '2h',
                value: 2,
              },
              {
                label: '2,5h',
                value: 2.5,
              },
            ]}
          />
        ),
      },
      {
        label: 'Evaluation Template',
        path: 'evaluationTemplate',
        render: (value, row) => (
          <FetchSelect
            url={`/evaluation-templates?query[school]=${row.school.id}`}
            placeholder="Select the template"
            label=""
            value={value}
            onChange={template => props.onChange('evaluationTemplate', template, row)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        ),
      },
    ]}
    rows={props.schoolClasses}
  />
);

EvaluationTemplateLinkList.propTypes = {
  schoolClasses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EvaluationTemplateLinkList;