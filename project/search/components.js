import React from 'react';
import Autosuggest from 'react-autosuggest';
import { SkillCollection } from '../skills/managers';

import { BaseComponent } from 'outlinejs/lib/components';

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
