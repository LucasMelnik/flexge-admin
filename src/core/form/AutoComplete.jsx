import React, { PropTypes } from 'react';
import { AutoComplete as MaterialAutoComplete } from 'material-ui';

const AutoComplete = props => (
  <MaterialAutoComplete
    dataSource={props.dataSource}
    dataSourceConfig={props.dataSourceConfig}
    disabled={props.disabled}
    errorText={props.errorText}
    filter={MaterialAutoComplete.fuzzyFilter}
    floatingLabelText={props.label}
    fullWidth={props.fullWidth}
    onNewRequest={value => props.onSelect(value)}
    onUpdateInput={text => props.onUpdateInput && props.onUpdateInput(text)}
    open={props.open}
    openOnFocus
    searchText={props.value}
    style={props.style}
    underlineShow={props.underlineShow}
  />
);

AutoComplete.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataSourceConfig: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  onUpdateInput: PropTypes.func,
  open: PropTypes.bool,
  style: PropTypes.object,
  underlineShow: PropTypes.bool,
  value: PropTypes.string,
};

AutoComplete.defaultProps = {
  disabled: false,
  errorText: null,
  label: '',
  fullWidth: true,
  open: false,
  style: null,
  underlineShow: true,
  value: '',
  onUpdateInput: null,
};

export default AutoComplete;
