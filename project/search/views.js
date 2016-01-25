import { BaseView } from 'outlinejs/views';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';

export class MyLayoutView extends BaseView {
  render() {
    var Content = this.props.content;

    return <div>
      <h1>{ gettext('search - layout') }</h1>
      <Content { ...this.props.contentProps } controller={ this.controller } />
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
