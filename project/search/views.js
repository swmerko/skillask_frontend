import { BaseView } from 'outlinejs/lib/views';
import React from 'react';
import { gettext } from 'outlinejs/lib/utils/translation';

export class SearchContentView extends BaseView {
  render() {
    var users;
    if (this.props.userSkills) {
      users = <ul>
        {
          this.props.userSkills.map((userSkill) => {
            return <li key={ userSkill.id }>
              { userSkill.userFullName }
            </li>;
          })
        }
      </ul>;
    }

    return <div className="content-container">
      <div className="search focused">
        <h2>Search</h2>
        { users }
      </div>

      <div className="profile unfocused">
        <h2>Profile</h2>
      </div>

    </div>;
  }
}
