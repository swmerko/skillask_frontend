import React from 'react';
import ReactDOM from 'react-dom';

import { BaseView } from 'outlinejs/lib/views';

import jQuery from 'jquery';

import { ProfileComponent } from './components';
import { SearchComponent } from '../search/components';


export class ProfileContentView extends BaseView {
  goToSearch() {
    this.response.navigate('search:main', {});
  }

  componentDidMount() {
    let searchContainer = ReactDOM.findDOMNode(this.refs.searchContainer);
    let profileContainer = ReactDOM.findDOMNode(this.refs.profileContainer);

    jQuery(searchContainer).animate({
      opacity: 0.9,
      width: '23.7288135593%'
    }, 500, function () {
      jQuery(profileContainer).addClass('unfocused'); //eslint-disable-line
    });
    jQuery(profileContainer).animate({
      opacity: 1,
      width: '74.5762711864%'
    }, 500, function () {
      jQuery(searchContainer).addClass('focused'); //eslint-disable-line
    });
  }


  render() {


    return <div className="content-container">
      <div className="search" onClick={this.goToSearch.bind(this)} ref="searchContainer">
        <SearchComponent delegate={ this.delegate } userSkills={this.props.userSkills}/>
      </div>

      <div className="profile" ref="profileContainer">
        <ProfileComponent />

      </div>

    </div>;
  }
}
