import { BaseView } from 'outlinejs/views';
import { BaseComponent } from 'outlinejs/components';
import React from 'react';
import { gettext } from 'outlinejs/utils/translation';
import 'bootstrap';

export class BaseLayoutView extends BaseView {
  render() {
    var Content = this.props.content;

    return <div id="page-top">
      <nav id="mainNav" className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
            </button>
            <a className="navbar-brand page-scroll" href="#page-top">SkillAsk or whatever</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a className="page-scroll" href="#about">About</a>
              </li>
              <li>
                <a className="page-scroll" href="#services">Services</a>
              </li>
              <li>
                <a className="page-scroll" href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a className="page-scroll" href="#contact">Contact</a>
              </li>
            </ul>
          </div>

        </div>

      </nav>


      <Content { ...this.props.contentProps } controller={ this.controller }/>

      <aside className="bg-dark">
        <div className="container text-center">
          <div className="call-to-action">
            <h2>Free Download at Start Bootstrap!</h2>
            <a href="#" className="btn btn-default btn-xl wow tada">Download Now!</a>
          </div>
        </div>
      </aside>

      <section id="contact">
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
      </section>
    </div>;
  }
}

export class HeaderView extends BaseComponent {
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
