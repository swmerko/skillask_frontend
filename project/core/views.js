import React from 'react';

import { BaseLayoutView } from 'outlinejs/lib/views';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';


const styles = {
  container: {
    textAlign: 'center'
  }
};

const muiTheme = getMuiTheme({
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.cyan500,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.deepOrange500,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500
  }
}, {userAgent: 'all'});


export class LayoutView extends BaseLayoutView {
  render() {
    return <div className="wrap">
      <div className="mainContent">{this.renderContent()}</div>
    </div>;
  }
}

export class MaterialLayoutView extends BaseLayoutView {

  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div className="wrap" style={styles.container}>

        <div className="mainContent">{this.renderContent()}</div>

      </div>
    </MuiThemeProvider>;
  }
}
