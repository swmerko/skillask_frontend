import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';

import Autosuggest from 'react-autosuggest';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

import { SkillCollection } from '../skills/managers';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    overflowY: 'auto',
    margin: 30
  }
};

class ResultsView extends BaseComponent {
  render() {
    var results;
    if (this.props.userSkills && this.props.userSkills.length > 0) {
      results = <div style={styles.root}>
        <GridList
          cellHeight={300}
          style={styles.gridList}
          cols={3}
          rows={1}
        >
          {this.props.userSkills.map(user => <GridTile
              key={user.id}
              title={user.skillName}
              subtitle={<span>by <b>{user.userFullName}</b></span>}
              actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
            >
              <img src={user.userProfileImageUrl}/>
            </GridTile>
          )}
        </GridList>
      </div>;
    } else {
      results = <h1>Nessun risultato</h1>;
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


    return <div className="content-container">
      <h2>{ this.i18n.gettext('Search')}</h2>
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
