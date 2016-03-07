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
    </div>;
  }
}

export class MyContentView extends BaseView {
  render() {

    return <div className="content-container">
      <div className="search">
        <h2>Search</h2>
        <div className="search-input">
          <SearchInputView/>
        </div>
        <hr/>
        <div className="search-result">
        </div>

      </div>

      <div className="profile unfocused">
        <h2>Profile</h2>
      </div>

    </div>;
  }
}
