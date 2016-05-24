import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';

import {SearchSkillInputView} from './autosuggestions';


class UserCardResult extends BaseComponent {
  render() {
    return <div className="search-result-card mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
      <figure className="mdl-card__media">
        <img src={this.props.user.userProfileImageUrl} alt={this.props.user.userFullName}/>
      </figure>
      <div className="mdl-card__title">
        <h1 className="mdl-card__title-text">{this.props.user.userFullName}</h1>
      </div>
      <div className="mdl-card__supporting-text">
        <p>{this.props.user.skillName}</p>
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read More</a>
        <div className="mdl-layout-spacer"></div>
        <button className="mdl-button mdl-button--icon mdl-button--colored"><i className="material-icons">favorite</i>
        </button>
        <button className="mdl-button mdl-button--icon mdl-button--colored"><i className="material-icons">share</i>
        </button>
      </div>
    </div>;
  }
}


class ResultsView extends BaseComponent {
  render() {
    var results;
    if (this.props.userSkills && this.props.userSkills.length > 0) {
      results = <div className="mdl-grid">
        {this.props.userSkills.map(user => {
          return <UserCardResult user={user} key={user.id}/>;
        })}
      </div>;
    } else {
      results = <h2>Nessun risultato</h2>;
    }

    return results;
  }
}

export class SearchComponent extends BaseComponent {

  handleSelect(suggestion) {
    this.response.navigate('search:skill', {skillId: suggestion.id});
  }

  render() {


    return <div>

      <div className="base-nav-icons">
        <img src="/static/core/media/images/searchIcon.png"/>
      </div>

      <div className="search-input">
        <SearchSkillInputView delegate={ this.delegate }
                              handleSelect={ this.handleSelect.bind(this) }
                              placeholder={ 'Search some skilled people' }/>
      </div>
      <hr/>
      <div className="search-result">
        <ResultsView delegate={ this.delegate } userSkills={ this.props.userSkills }/>
      </div>

    </div>;
  }
}
