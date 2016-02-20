import { BaseView } from 'outlinejs/views';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';
import { BaseComponent } from 'outlinejs/components';
import { SearchInputView } from './components';

class InizialSearchResultsView extends BaseComponent {
  render() {
    return <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading"> { gettext('Type something to star searching things') }</h2>
            <hr className="primary"/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
          ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
        </div>
      </div>
    </section>;
  }
}

class SearchNoResultsView extends BaseComponent {
  render() {
    return <div>
      { gettext('No results') }
    </div>;
  }
}


class ResultsView extends BaseView {
  render() {
    var results;
    if (this.props.users.length > 0) {
      results = <ul>
        {
          this.props.users.map((userSkill) => {
            console.log(userSkill);
            return <div key={ userSkill.id } className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <img src={ userSkill.userProfileImageUrl }/>

                <h3>{ userSkill.userFullName }</h3>

                <p className="text-muted">{ userSkill.skillName }</p>
              </div>
            </div>;
          })
        }
      </ul>;
    } else {
      results = <SearchNoResultsView />;
    }

    return <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Search - { this.props.searchString } </h2>
            <hr className="primary"/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          { results }
        </div>
      </div>
    </section>;
  }
}

export class SearchView extends BaseView {

  handleChange(event) {
    var searchString = event.target.value;
    this.controller.search(searchString);
  }

  suggestionChange(event) {
    var suggestionString = event.target.value;
    this.controller.getSuggestions(suggestionString);
  }

  handleSelect(suggestion) {
    this.controller.search(suggestion);
  }

  render() {
    var resultsView;

    if (this.props.searchString.length > 0) {
      resultsView = <ResultsView searchString={ this.props.searchString }
                                 users={ this.props.users }
                                 controller={ this.controller }/>;
    } else {
      resultsView = <InizialSearchResultsView />;
    }


    return <div>

      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <h2 className="section-heading">We've got the skills you need!</h2>
              <hr className="light"/>
              {/*
               <div className="input-group" id="bloodhound">
               <span className="input-group-addon"><i className="fa fa-search fa-fw"></i></span>
               <input className="form-control input-lg typeahead" type="search"
               placeholder="Search the skill you want!" data-provide="typeahead"
               autoComplete="off" onChange={ this.handleChange.bind(this) }
               onKeyUp={ this.suggestionChange.bind(this) }/>

               </div>

               { suggestions }
               */}


              <SearchInputView controller={ this.controller } handleSelect={ this.handleSelect }/>

            </div>
          </div>
        </div>
      </section>

      { resultsView }

    </div>;
  }
}
