import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  indigo700,
  blue800,
  blue600,
  grey400,
  orange800,
  orange100,
  grey500,
  darkBlack,
  white,
  grey300,
  fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue800,
    primary2Color: blue600,
    primary3Color: grey400,
    accent1Color: orange800,
    accent2Color: orange100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue800,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
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
