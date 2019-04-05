import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../../core/form/FetchSelect';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Button from '../../../../core/form/Button';

const ItemByWordsListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={2}>
        <FetchSelect
          url="/courses"
          label="Select the course"
          disabled={props.fetching}
          value={get(props.values, 'course')}
          onChange={(value) => {
            props.onChange('course', value);
            props.onChange('module', null);
            props.onChange('words', null);
          }}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={4}>
        <FetchSelect
          label="Filter by module"
          placeholder="Select the course to allow select the  module"
          url={props.values.course && `/modules?query[course]=${get(props.values, 'course', '')}`}
          disabled={props.fetching || !props.values.course}
          value={get(props.values, 'module')}
          onChange={(value) => {
            props.onChange('module', value);
            props.onChange('words', null);
          }}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={3}>
        <TextInput
          label="Words"
          disabled={props.fetching || !props.values.module}
          value={get(props.values, 'words', '')}
          onChange={value => props.onChange('words', value)}
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 42 }} />
        <Button
          disabled={props.fetching || !props.values.words}
          icon="search"
          buttonType="submit"
          label="Search"
        />
      </Column>
    </Row>
  </form>
);

ItemByWordsListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

ItemByWordsListFilter.defaultProps = {
  fetching: false,
};

export default ItemByWordsListFilter;
