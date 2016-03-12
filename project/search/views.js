import { BaseView } from 'outlinejs/lib/views';
import React from 'react';
import { SearchInputView } from './components';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';

import { BaseComponent } from 'outlinejs/lib/components';

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


export class SearchContentView extends BaseView {

  //handleChange(event) {
  //  var searchString = event.target.value;
  //  this.delegate.search(searchString);
  //}
  //
  //suggestionChange(event) {
  //  var suggestionString = event.target.value;
  //  this.delegate.getSuggestions(suggestionString);
  //}
  goToProfile() {
    this.response.navigate('profile:main', {});
  }

  handleSelect(suggestion) {
    this.delegate.search(suggestion);
  }

  render() {


    return <div className="content-container">
      <div className="search focused">
        <h2>{ this.i18n.gettext('Search')}</h2>
        <div className="search-input">
          <SearchInputView delegate={ this.delegate } handleSelect={ this.handleSelect }/>
        </div>
        <hr/>
        <div className="search-result">
          <ResultsView delegate={ this.delegate } userSkills={ this.props.userSkills }/>
        </div>

      </div>

      <div className="profile unfocused" onClick={this.goToProfile.bind(this)}>
        <h2>{ this.i18n.gettext('Profile')}</h2>
      </div>

    </div>;
  }
}