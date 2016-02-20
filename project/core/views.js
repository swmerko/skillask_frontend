import { BaseView } from 'outlinejs/views';
import React from 'react';
import { RouteUtils } from 'outlinejs/routers';
import { gettext } from 'outlinejs/utils/translation';
import 'bootstrap';

export class LayoutView extends BaseView {
  render() {
    var Content = this.props.content;

    return <div id="page-top">
      <NavView { ...this.props.contentProps } />

      <Content { ...this.props.contentProps } controller={ this.controller }/>

      <AsideView />

      <FooterView />
    </div>;
  }
}

export class HeaderView extends BaseView {
  render() {
    return <header>
      <div className="header-content">
        <div className="header-content-inner">

          <div className="input-group" id="bloodhound">
            <span className="input-group-addon"><i className="fa fa-search fa-fw"></i></span>
            <input className="form-control input-lg typeahead" type="search"
                   placeholder="Search the bloody skill you fucking want! Damnass" data-provide="typeahead"
                   autoComplete="off"/>
          </div>
          <hr />
          <p>Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download
            your
            template and start going, no strings attached!</p>
          <a href="#about" className="btn btn-primary btn-xl page-scroll">Scrivi la tua storia con noi</a>
        </div>
      </div>
    </header>;
  }
}


export class NavView extends BaseView {


  render() {

    let navbarRight;
    if (this.props.currentUser.firstName !== undefined) {
      navbarRight =
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href={ RouteUtils.reverse('profile:main') }>
              { gettext('Hi') } { this.props.currentUser.firstName } <i className="fa fa-user"></i>
            </a>
          </li>
          <li>
            <a href={ RouteUtils.reverse('profile:main') }>
              { gettext('Go to your profile') } <i className="fa fa-user"></i>
            </a>
          </li>

          <li>
            <a href={ RouteUtils.reverse('profile:addSkills') }>
              { gettext('Add some skills') } <i className="fa fa-user"></i>
            </a>
          </li>
        </ul>;
    } else {
      navbarRight = <ul className="nav navbar-nav navbar-right">
        <li>
          <a className="page-scroll"
             href="https://skillask.herokuapp.com/login/facebook/">{ gettext('Login with Facebook') } <i
            className="fa fa-facebook"></i>
          </a>
        </li>
      </ul>;
    }


    return <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">SkillAsk or whatever</a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          { navbarRight }
        </div>

      </div>

    </nav>;
  }
}


export class AsideView extends BaseView {
  render() {
    return <aside className="bg-dark">
      <div className="container text-center">
        <div className="call-to-action">
          <h2>Free Download at Start Bootstrap!</h2>
          <a href="#" className="btn btn-default btn-xl wow tada">Download Now!</a>
        </div>
      </div>
    </aside>;
  }
}


export class FooterView extends BaseView {
  render() {
    return <section id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2 text-center">
            <h2 className="section-heading">Let's Get In Touch!</h2>
            <hr className="primary"/>
            <p>Ready to start your next project with us? That's great! Give us a call or send us an email and we
              will get back to you as soon as possible!</p>
          </div>
          <div className="col-lg-4 col-lg-offset-2 text-center">
            <i className="fa fa-phone fa-3x wow bounceIn"></i>

            <p>123-456-6789</p>
          </div>
          <div className="col-lg-4 text-center">
            <i className="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i>

            <p><a href="mailto:your-email@your-domain.com">feedback@startbootstrap.com</a></p>
          </div>
        </div>
      </div>
    </section>;
  }
}
