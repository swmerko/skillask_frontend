import React from 'react';
import {BaseLayoutView} from 'outlinejs/lib/views';
import {Grid} from 'react-flexgrid';
import Snackbar from 'material-ui/Snackbar';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {defaultCenter} from './notification-center';
import {GuiNotifications} from './notifications';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

export class LayoutView extends BaseLayoutView {
  render() {
    return <div className='wrap'>{this.renderContent()}</div>;
  }
}

export class MaterialLayoutView extends BaseLayoutView {
  constructor(props) {
    super(props);

    this.state = {
      showSnackBar: false,
      textSnackBar: '',
      actionLabelSnackBar: '',
      actionFunctionSnackbar: null
    };
  }

  componentDidMount() {
    let snackBarEvent = GuiNotifications.snackBarEvent;
    defaultCenter.on(snackBarEvent, (text, actionLabel, actionFunction) => {
      this.showSnackBar(text, actionLabel, actionFunction);
    });
  }

  showSnackBar(text, actionLabel, actionFunction) {
    this.setState({
      showSnackBar: true,
      textSnackBar: text,
      actionLabelSnackBar: actionLabel,
      actionFunctionSnackbar: actionFunction
    });
  }

  closeSnackBar() {
    this.setState({
      showSnackBar: false,
      textSnackBar: '',
      actionLabelSnackBar: '',
      actionFunctionSnackbar: null
    });
  }

  goToHome() {
    this.response.navigate('home:main');
  }

  render() {
    const {showSnackBar, textSnackBar, actionLabelSnackBar, actionFunctionSnackbar} = this.state;

    let snackbar;

    if (actionLabelSnackBar && typeof actionFunctionSnackbar === 'function') {
      snackbar = <Snackbar autoHideDuration={3750}
                           open={showSnackBar}
                           onRequestClose={this.closeSnackBar.bind(this)}
                           onActionTouchTap={actionFunctionSnackbar.bind(this)}
                           action={actionLabelSnackBar}
                           message={textSnackBar}>
        {textSnackBar}
      </Snackbar>;
    } else {
      snackbar = <Snackbar autoHideDuration={2750}
                           open={showSnackBar}
                           onRequestClose={this.closeSnackBar.bind(this)}
                           message={textSnackBar}>
        {textSnackBar}
      </Snackbar>;
    }

    return <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Grid fluid={true}>
          {this.renderContent()}
        </Grid>
        {snackbar}
      </div>
    </MuiThemeProvider>;
  }
}
