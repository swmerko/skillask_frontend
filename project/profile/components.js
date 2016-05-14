/**
 * Created by erko on 20/03/16.
 */
import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';
import { settings } from 'outlinejs/lib/contexts';

import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    padding: 10
  }
};

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
    return (
      <Tabs value={this.state.value} onChange={this.handleChange.bind(this)}>
        <Tab label="Brain" icon={<i className="fa fa-eye"></i>} value="a">
          <div>
            <h2 style={styles.headline}>Controllable Tab A</h2>
            <p>
              Tabs are also controllable if you want to programmatically pass them their values.
              This allows for more functionality in Tabs such as not
              having any Tab selected or assigning them different values.<i className="fa fa-eye"></i>
            </p>
          </div>
        </Tab>
        <Tab label="Tab B" value="b">
          <div>
            <h2 style={styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
    );
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
