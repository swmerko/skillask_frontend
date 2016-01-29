import { BaseView } from 'outlinejs/views';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';

//import { HeaderView } from '../core/views';


export class SearchView extends BaseView {

  handleChange(event) {
    var searchString = event.target.value;
    //console.log(searchString);
    this.controller.search(searchString);
  }

  render() {
    var users;

    if (this.props.users.length > 0) {
      users = <ul>
        {
          this.props.users.map((user) => {
            return <div key={ user.id } className="col-lg-3 col-md-6 text-center">
              <div className="service-box">
                <img src="http://lorempixel.com/100/100/"/>

                <h3>{ user.displayName }</h3>

                <p className="text-muted">Our templates are updated regularly so they don't break.</p>
              </div>
            </div>;
          })
        }
      </ul>;
    } else {
      users = <h3> No results </h3>;
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
                       autoComplete="off" onChange={ this.handleChange.bind(this) } />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading">At Your Service - { this.props.searchString } </h2>
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

