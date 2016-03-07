import { BaseView } from 'outlinejs/lib/views';
import React from 'react';
import { gettext } from 'outlinejs/lib/utils/translation';
import { SearchInputView } from './components';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';


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

class ResultsView extends BaseView {
  render() {
    var results;
    if (this.props.userSkills.length > 0) {
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


export class SearchView extends BaseView {

  handleChange(event) {
    var searchString = event.target.value;
    this.delegate.search(searchString);
  }

  suggestionChange(event) {
    var suggestionString = event.target.value;
    this.delegate.getSuggestions(suggestionString);
  }

  handleSelect(suggestion) {
    this.delegate.search(suggestion);
  }

  render() {


    return <div className="content-container">
      <div className="search focused">
        <h2>Search</h2>
        <div className="search-input">
          <SearchInputView delegate={ this.delegate } handleSelect={ this.handleSelect }/>
        </div>
        <hr/>
        <div className="search-result">
          <ResultsView delegate={ this.delegate } userSkills={ this.props.userSkills }/>
        </div>

      </div>

      <div className="profile unfocused">
        <h2>Profile</h2>
      </div>

    </div>;
  }
}