import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';

const AchievementListFilter = props => (
  <TextInput
    label="Search for achievements"
    placeholder="Start type to filter the achievements"
    value={props.value}
    onChange={props.onChange}
  />
);

AchievementListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AchievementListFilter;
