import React from 'react';

import { BaseLayoutView } from 'outlinejs/lib/views';
import { Grid } from 'react-flexgrid';
import { Snackbar } from 'react-mdl';

import {defaultCenter} from './notification-center';
import {GuiNotifications} from './notifications';

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
    const {showSnackBar, textSnackBar, actionLabelSnackBar, actionFunctionSnackbar } = this.state;

    let snackbar;

    if (actionLabelSnackBar && typeof actionFunctionSnackbar === 'function') {
      snackbar = <Snackbar timeout={3750}
                           active={showSnackBar}
                           onTimeout={this.closeSnackBar.bind(this)}
                           onClick={actionFunctionSnackbar.bind(this)}
                           action={actionLabelSnackBar}>
        {textSnackBar}
      </Snackbar>;
    } else {
      snackbar = <Snackbar timeout={2750}
                           active={showSnackBar}
                           onTimeout={this.closeSnackBar.bind(this)}>
        {textSnackBar}
      </Snackbar>;
    }


    return <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">SkillAsk</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
            <a className="mdl-navigation__link" href="">Link</a>
          </nav>
        </div>
      </header>
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">SkillAsk.Com</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
      <main className="mdl-layout__content">
        <div className="page-content">
          <Grid>
            {this.renderContent()}
          </Grid>
        </div>
      </main>
      {snackbar}
    </div>;
  }
}
