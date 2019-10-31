import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Button from '../../../../core/form/Button';

const MasteryTestItemExecutionStatsListFilter = props => (
  <Row>
    <Column size={2}>
      <FetchSelect
        required
        url="/courses"
        label="Select the course"
        disabled={props.fetching}
        value={get(props.values, 'course')}
        onChange={value => props.onChange('course', value)}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column size={2.5}>
      <FetchSelect
        url="/modules"
        label="Select the module"
        disabled={props.fetching || !props.values.course}
        value={get(props.values, 'module')}
        onChange={value => {
          props.onChange('module', value);
          props.onChange('masteryTest', undefined);
        }}
        params={{
          ...get(props.values, 'course', false) && {
            query: {
              course: get(props.values, 'course', ''),
            }
          }
        }}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    {!!props.values.module && (
      <Column size={1.5}>
        <FetchSelect
          url={`/modules/${get(props.values, 'module')}/mastery-tests`}
          label="Select the Mastery"
          disabled={props.fetching}
          value={get(props.values, 'masteryTest')}
          onChange={value => props.onChange('masteryTest', value)}
          resultTransformer={{
            text: 'modulePercentageToActive',
            value: 'id',
          }}
        />
      </Column>
    )}
    <Column size={2}>
      <div
        style={{
          height: 42,
        }}
      />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

MasteryTestItemExecutionStatsListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

MasteryTestItemExecutionStatsListFilter.defaultProps = {
  fetching: false,
};

export default MasteryTestItemExecutionStatsListFilter;
