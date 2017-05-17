import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo700 } from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo700,
  },
  appBar: {
    height: 50,
  },
  tabs: {
    backgroundColor: 'transparent',
    textColor: '#000',
    selectedTextColor: '#000',
  },
  datePicker: {
    selectColor: indigo700,
  },
});

const Theme = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {props.children}
  </MuiThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
