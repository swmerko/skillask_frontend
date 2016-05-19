/**
 * Created by erko on 20/03/16.
 */
import React from 'react';

import {BaseComponent} from 'outlinejs/lib/components';
import {settings} from 'outlinejs/lib/contexts';

import {Tabs, Tab} from 'react-mdl';

export class ProfileTabs extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {activeTab: 2, value: 'a'};
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return <div>
      <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
        <Tab>Starks</Tab>
        <Tab>Lannisters</Tab>
        <Tab>Targaryens</Tab>
      </Tabs>
      <section>
        <div className="content">Content for the tab: {this.state.activeTab}</div>
      </section>
    </div>
      ;
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
