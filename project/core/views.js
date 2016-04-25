import React from 'react';

import { BaseLayoutView } from 'outlinejs/lib/views';
import { Grid } from 'react-flexgrid';


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
    </div>;
  }
}
