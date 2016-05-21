/**
 * Created by erko on 20/03/16.
 */
import React from 'react';

import {BaseComponent} from 'outlinejs/lib/components';
import {settings} from 'outlinejs/lib/contexts';

import {Tabs, Tab} from 'react-mdl';

export class SuggestionList extends BaseComponent {

  handleClick(skillId) {
    this.props.delegate.addSkillToUser(skillId);
  }

  render() {
    let items = this.props.skills.map((skill) => {
      return <li key={skill.id} onClick={this.handleClick.bind(this, skill.id)}>{skill.name}</li>;
    });
    return <section>
      <div className="content">
        <ul>
          {items}
        </ul>
      </div>
    </section>;
  }
}

export class ProfileTabs extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {activeTab: 1};
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {

    let tabs = Object.keys(this.props.suggestions).map((category) => {
      return <Tab key={category}>{category}</Tab>;
    });
    let activeContent = '';
    if (Object.keys(this.props.suggestions).length > 0) {
      activeContent =
        <SuggestionList delegate={this.props.delegate} skills={this.props.suggestions[this.state.activeTab + 1]}/>;
    }

    return <div>
      <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
        {tabs}
      </Tabs>
      {activeContent}
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
      content = <ProfileTabs delegate={this.props.delegate} suggestions={this.props.userSkillSuggestions}/>;
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
