import React from 'react';
import ReactDOM from 'react-dom';

import { BaseView } from 'outlinejs/lib/views';

import jQuery from 'jquery';

import { SearchComponent } from './components';
import { ProfileComponent } from '../profile/components';


export class SearchContentView extends BaseView {

  goToProfile() {
    this.response.navigate('profile:main', {});
  }

  componentDidMount() {
    let searchContainer = ReactDOM.findDOMNode(this.refs.searchContainer);
    let profileContainer = ReactDOM.findDOMNode(this.refs.profileContainer);

    jQuery(profileContainer).animate({
      opacity: 0.9,
      width: '23.7288135593%'
    }, 500, function () {
      jQuery(profileContainer).addClass('unfocused'); //eslint-disable-line
    });
    jQuery(searchContainer).animate({
      opacity: 1,
      width: '74.5762711864%'
    }, 500, function () {
      jQuery(searchContainer).addClass('focused'); //eslint-disable-line
    });
  }


  render() {


    return <div className="content-container">
      <div className="search" ref="searchContainer">

        <SearchComponent delegate={ this.delegate } userSkills={this.props.userSkills}/>

      </div>

      <div className="profile" ref="profileContainer" onClick={this.goToProfile.bind(this)}>
        <ProfileComponent />
      </div>

    </div>;
  }
}
