import React from 'react';

import { BaseView } from 'outlinejs/lib/views';

import { ProfileComponent } from '../profile/components';
import { SearchComponent } from '../search/components';

export class HomeView extends BaseView {
  goToSearch() {
    this.response.navigate('search:main', {});
  }

  goToProfile() {
    this.response.navigate('profile:main', {});
  }

  //$(this).addClass('abc',1000);

  render() {

    return <div className="content-container">
      <div className="search" onClick={this.goToSearch.bind(this)} ref="search">
        <SearchComponent />

      </div>

      <div className="profile" onClick={this.goToProfile.bind(this)} ref="profile">
        <ProfileComponent />
      </div>

    </div>;
  }
}
