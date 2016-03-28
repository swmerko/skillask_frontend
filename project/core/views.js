import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { BaseLayoutView, BaseView } from 'outlinejs/lib/views';

import { Grid, Row, Col } from 'react-flexgrid';
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
    return <div className='wrap'>{this.renderContent()}</div>;
  }
}

export class MaterialLayoutView extends BaseLayoutView {

  goToHome() {
    this.response.navigate('home:main');
  }

  render() {

    let headerLogo = this.props.contentProps.isHome ? '/static/core/media/images/skillaskLogo.png' : '/static/core/media/images/skillaskLogoLite.png';
    return <MuiThemeProvider muiTheme={muiTheme}>
      <Grid>
        <Row className="center-xs">
          <Col xs={12}>
            <div className="box">
              <img src={headerLogo} onClick={this.goToHome.bind(this)}/>
            </div>
          </Col>
        </Row>
          {this.renderContent()}
      </Grid>
    </MuiThemeProvider>;
  }
}