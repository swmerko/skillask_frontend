import { BaseView } from 'outlinejs/lib/views';
import React from 'react';
import { gettext } from 'outlinejs/lib/utils/translation';

export class MyLayoutView extends BaseView {
  render() {
    var Content = this.props.content;

    return <div className="wrap">
      <div className="search">Search</div>
      <div className="profile">Profile
        <Content { ...this.props.contentProps } delegate={ this.delegate }/>
      </div>
      <div className="search focused">Search example</div>
      <div className="profile unfocused">Profile example</div>
    </div>;
  }
}

export class MyContentView extends BaseView {
  render() {
    var users;
    if (this.props.users) {
      users = <ul>
        {
          this.props.users.map((user) => {
            return <li key={ user.id }>
              <a href={`mailto:${user.email}`}>{ user.displayName }</a>
            </li>;
          })
        }
      </ul>;
    }

    return <div>
      <p>{ this.props.myVar }</p>
      { users }
    </div>;
  }
}
