import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';

import Autosuggest from 'react-autosuggest';

import { SkillCollection } from '../skills/managers';

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
        <button className="mdl-button mdl-button--icon mdl-button--colored"><i className="material-icons">favorite</i></button>
        <button className="mdl-button mdl-button--icon mdl-button--colored"><i className="material-icons">share</i></button>
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


/* ----------- */
/*    Utils    */
/* ----------- */

export class SearchInputView extends BaseComponent {

  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };

    this.cache = {
      [this.state.value]: this.state.suggestions
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }


  async searchSkillSuggestions(skillName) {
    if (skillName) {
      let skillsSuggestionsCollection = new SkillCollection();
      let skillSuggestions = await skillsSuggestionsCollection.filterBySkillName(skillName);
      let cleanedSkillSuggestions = [];
      skillSuggestions.forEach(function (suggestion) {
        cleanedSkillSuggestions.push({id: suggestion.id, name: suggestion.name});
      });
      return cleanedSkillSuggestions;
    } else {
      return [];
    }
  }

  async loadSuggestions(value) {
    const cacheKey = value.trim().toLowerCase();

    if (this.cache[cacheKey]) {
      this.setState({
        suggestions: this.cache[cacheKey]
      });
    } else {
      this.setState({
        isLoading: true
      });

      var skillsSuggestions = await this.searchSkillSuggestions(value);
      if (value === this.state.value) {
        this.cache[cacheKey] = skillsSuggestions;
        this.setState({
          isLoading: false,
          suggestions: skillsSuggestions
        });
      } else { // Ignore suggestions if input value changed
        this.setState({
          isLoading: false
        });
      }
    }
  }

  onChange(event, {newValue}) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsUpdateRequested({value}) {
    this.loadSuggestions(value);
  }


  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
  }

  onSuggestionSelected(event, {suggestion}) {
    this.props.handleSelect(suggestion);
  }

  render() {
    const { value, suggestions, isLoading} = this.state;
    const inputProps = {
      placeholder: 'Search some skill',
      value,
      onChange: this.onChange
    };
    //const status = isLoading ? 'Loading...' : 'Type to load suggestions';
    const loadingClass = isLoading ? 'loading' : '';

    return <div className={ loadingClass }>
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   onSuggestionSelected={this.onSuggestionSelected}
                   getSuggestionValue={this.getSuggestionValue}
                   renderSuggestion={this.renderSuggestion}
                   inputProps={inputProps}/>
    </div>;
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
        <SearchInputView delegate={ this.delegate } handleSelect={ this.handleSelect.bind(this) }/>
      </div>
      <hr/>
      <div className="search-result">
        <ResultsView delegate={ this.delegate } userSkills={ this.props.userSkills }/>
      </div>

    </div>;
  }
}
