/**
 * Created by erko on 20/03/16.
 */
import React from 'react';
import {BaseComponent} from 'outlinejs/lib/components';
import {settings} from 'outlinejs/lib/contexts';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {SearchSkillInputView} from '../search/autosuggestions';

export class SuggestionList extends BaseComponent {

  handleClick(skill) {
    this.props.delegate.addSkillToUser(skill);
  }

  render() {
    let items = this.props.skills.map((skill) => {
      return <ListItem key={skill.id} onClick={this.handleClick.bind(this, skill)} primaryText={skill.name} leftIcon={<ContentInbox />}>
      </ListItem>;
    });
    return <section>
      <div className="content">
        <List>
          {items}
        </List>
      </div>
    </section>;
  }
}

export class ProfileTabs extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: '1'
    };
  }

  handleChange(value) {
    this.setState({
      value: value
    });
  }

  render() {

    let tabs = Object.keys(this.props.suggestions).map((category) => {
      return <Tab key={category} label={category} value={category}>
        <SuggestionList delegate={this.props.delegate} skills={this.props.suggestions[category]}/>
      </Tab>;
    });

    return <div>
      <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
        {tabs}
      </Tabs>
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

  handleSelect(skill) {
    this.props.delegate.addSkillToUser(skill);
  }

  render() {

    let content;

    if (this.request.user) {
      content = <div>
        <div className="search-input">
          <SearchSkillInputView delegate={ this.delegate }
                                handleSelect={ this.handleSelect.bind(this)}
                                placeholder={'Search some skill for your profile'}
                                excludeTheirSkills={true}/>
        </div>
        <hr/>
        <ProfileTabs delegate={this.props.delegate} suggestions={this.props.userSkillSuggestions}/>
      </div>;
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
