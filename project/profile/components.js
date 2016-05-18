/**
 * Created by erko on 20/03/16.
 */
import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';
import { settings } from 'outlinejs/lib/contexts';

export class ProfileTabs extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a'
    };
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
      <div className="mdl-tabs__tab-bar">
        <a href="#starks-panel" className="mdl-tabs__tab is-active">Starks</a>
        <a href="#lannisters-panel" className="mdl-tabs__tab">Lannisters</a>
        <a href="#targaryens-panel" className="mdl-tabs__tab">Targaryens</a>
      </div>

      <div className="mdl-tabs__panel is-active" id="starks-panel">
        <ul>
          <li>Eddard</li>
          <li>Catelyn</li>
          <li>Robb</li>
          <li>Sansa</li>
          <li>Brandon</li>
          <li>Arya</li>
          <li>Rickon</li>
        </ul>
      </div>
      <div className="mdl-tabs__panel" id="lannisters-panel">
        <ul>
          <li>Tywin</li>
          <li>Cersei</li>
          <li>Jamie</li>
          <li>Tyrion</li>
        </ul>
      </div>
      <div className="mdl-tabs__panel" id="targaryens-panel">
        <ul>
          <li>Viserys</li>
          <li>Daenerys</li>
        </ul>
      </div>
    </div>;
  }
}

export class LoginComponent extends BaseComponent {

  login(backend) {
    this.response.navigate('auth:loginBackend', {backend: backend});
  }

  render() {


    return <div>
      <h4>Login with:</h4>

      <button className="mdl-button mdl-js-button mdl-button--fab"
              onClick={this.login.bind(this, settings.FACEBOOK_BACKEND)}>
        <i className="fa fa-facebook"></i>
      </button>

      <br/>
      <br/>


      <button className="mdl-button mdl-js-button mdl-button--fab"
              onClick={this.login.bind(this, settings.LINKEDIN_BACKEND)}>
        <i className="fa fa-linkedin"></i>
      </button>
    </div>;
  }
}


export class ProfileComponent extends BaseComponent {

  handleSelect(suggestion) {
    this.response.navigate('search:skill', {skillId: suggestion.id});
  }

  render() {

    let content;

    if (this.request.user) {
      content = <ProfileTabs />;
    } else {
      content = <LoginComponent />;
    }

    return <div>

      <div className="base-nav-icons">
        <img src="/static/core/media/images/profileIcon.png"/>
      </div>

      {content}

    </div>;
  }
}
