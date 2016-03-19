import React from 'react';

import { BaseView } from 'outlinejs/lib/views';
import { runtime } from 'outlinejs/lib/contexts';


export class HomeView extends BaseView {

  constructor() {
    super();
    if (runtime.isClient) {
      require('materialize');
    }
  }

  goToSearch() {
    this.response.navigate('search:main', {});
  }

  goToProfile() {
    this.response.navigate('profile:main', {});
  }

  componentDidMount() {
    if (runtime.isClient) {
      jQuery('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    }
  }

  render() {

    return <div className="content-container">
      <div className="search" onClick={this.goToSearch.bind(this)}>
        <h2>Search</h2>

        <a className="btn-floating btn-xlarge waves-effect waves-light red">
          <i className="fa fa-search fa-3x"></i>
        </a>


        <i className="fa fa-search fa-3x"></i>

      </div>

      <div className="profile" onClick={this.goToProfile.bind(this)}>
        <h2>Profile</h2>

        <ul className="collapsible popout" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
            <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
          </li>
        </ul>

      </div>


    </div>;
  }
}

