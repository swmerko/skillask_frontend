import { BaseView } from 'outlinejs/lib/views';
import React from 'react';

export class HomeView extends BaseView {
  goToSearch() {
    this.response.navigate( 'search:main', {});
  }
  goToProfile() {
    this.response.navigate( 'profile:main', {});
  }

  render() {

    return <div className="content-container">
      <div className="search" onClick={this.goToSearch.bind(this)}>
        <h2>Search</h2>

      </div>

      <div className="profile" onClick={this.goToProfile.bind(this)}>
        <h2>Profile</h2>
      </div>

    </div>;
  }
}
