import { BaseView } from 'outlinejs/lib/views';
import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';


export class ProfileContentView extends BaseView {
  goToSearch() {
    this.response.navigate('search:main', {});
  }

  render() {


    return <div className="content-container">
      <div className="search unfocused" onClick={this.goToSearch.bind(this)}>
        <h2>{ this.i18n.gettext('Search')}</h2>
      </div>

      <div className="profile focused">
        <h2>{ this.i18n.gettext('Profile')}</h2>
      </div>

    </div>;
  }
}