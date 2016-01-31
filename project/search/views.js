import { BaseView } from 'outlinejs/views';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';
import { BaseComponent } from 'outlinejs/components';

class InizialSearchResultsView extends BaseComponent {
  render() {
    return <div>
      { gettext('Type something to star searching things') }
    </div>;
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

  render() {
    var users;
    var suggestions;

    if (this.props.skillsSuggestions.length > 0) {
      suggestions = <div>
        <h4>{ gettext('Suggestions:') }</h4>
        <ul>
          {
            this.props.skillsSuggestions.map((skill) => {
              return <span key={ skill.id }>{ skill.name }, </span>;
            })
          }
        </ul>
      </div>;
    }

    if (this.props.users.length > 0) {
      users = <ul>
        {
          this.props.users.map((user) => {
            return <div key={ user.id } className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <img src={ user.userProfileImageUrl }/>

                <h3>{ user.userFullName }</h3>

                <p className="text-muted">{ user.skillName }</p>
              </div>
            </div>;
          })
        }
      </ul>;
    } else {
      if (this.props.searchString === '') {
        users = <InizialSearchResultsView />;

      } else {
        users = <h3>{ gettext('No results') }</h3>;
      }
    }

    return <div>

      <section className="bg-primary" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2 text-center">
              <h2 className="section-heading">We've got what you need!</h2>
              <hr className="light"/>
              <div className="input-group" id="bloodhound">
                <span className="input-group-addon"><i className="fa fa-search fa-fw"></i></span>
                <input className="form-control input-lg typeahead" type="search"
                       placeholder="Search the bloody skill you fucking want! Damnass" data-provide="typeahead"
                       autoComplete="off" onChange={ this.handleChange.bind(this) }
                       onKeyUp={ this.suggestionChange.bind(this) }/>

              </div>
              { suggestions }
            </div>
          </div>
        </div>
      </section>

      <section>
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
            { users }
          </div>
        </div>
      </section>

    </div>;

    /*    <div>
     <p>{ this.props.myVar }</p>
     { users }
     </div>;*/
  }
}