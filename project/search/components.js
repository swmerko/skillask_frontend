import React from 'react';
import {BaseComponent} from 'outlinejs/lib/components';
import {SearchSkillInputView} from './autosuggestions';
import {PaperComponent} from '../core/baseLayoutComponents';
import {UserSkillsResultsComponent} from './resultsComponents';
import {runtime} from 'outlinejs/lib/contexts';

class ResultComponent extends BaseComponent {
  render() {
    var results;
    if (this.props.userSkills && this.props.userSkills.length > 0) {
      results = <UserSkillsResultsComponent {...this.props}/>;
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

    let searchResultTitle = 'Type something up there for searching people.';

    if (runtime.isClient && this.props.skill.name) {
      searchResultTitle = `Results for ${this.props.skill.name}`;
    }

    return <div>

      <div className="base-nav-icons">
        <img src="/static/core/media/images/searchIcon.png"/>
      </div>
      <PaperComponent>
        <h4>Search</h4>
        <SearchSkillInputView delegate={ this.delegate }
                              handleSelect={ this.handleSelect.bind(this) }
                              placeholder={ 'Search some skilled people' }/>
      </PaperComponent>
      <hr/>
      <PaperComponent>
        <h4>{searchResultTitle}</h4>
        <ResultComponent delegate={ this.delegate } userSkills={ this.props.userSkills }/>
      </PaperComponent>
    </div>;
  }
}
