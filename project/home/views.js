import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';
import { BaseView } from 'outlinejs/lib/views';

import FloatingActionButton from 'material-ui/lib/floating-action-button';

import { AnimatedContent } from '../core/components';


//export class HomeViewComplete extends BaseView {
//  goToSearch() {
//    this.response.navigate('search:main', {});
//  }
//
//  goToProfile() {
//    this.response.navigate('profile:main', {});
//  }
//
//  render() {
//
//    return <div className="content-container">
//      <div className="search" onClick={this.goToSearch.bind(this)} ref="search">
//        <SearchComponent />
//
//      </div>
//
//      <div className="profile" onClick={this.goToProfile.bind(this)} ref="profile">
//        <ProfileComponent />
//      </div>
//
//    </div>;
//  }
//}
const buttonStyle = {
  margin: 20
};
//
//export class HomeView extends BaseView {
//  goToSearch() {
//    this.response.navigate('search:main', {});
//  }
//
//  goToProfile() {
//    this.response.navigate('profile:main', {});
//  }
//
//  render() {
//
//    return <Row className="center-xs">
//      <Col xs={6}>
//        <div className="box-row" ref="searchContainer" onClick={this.goToSearch.bind(this)}>
//          <FloatingActionButton style={buttonStyle} secondary={true}>
//            <i className="fa fa-search"></i>
//          </FloatingActionButton>
//
//          <h3>Cerca</h3>
//        </div>
//      </Col>
//      <Col xs={6}>
//        <div className="box-row" ref="profileContainer" onClick={this.goToProfile.bind(this)}>
//          <FloatingActionButton style={buttonStyle} secondary={true}>
//            <i className="fa fa-user"></i>
//          </FloatingActionButton>
//          <h3>Fatti trovare</h3>
//        </div>
//      </Col>
//    </Row>;
//  }
//}


export class HomeLeft extends BaseComponent {

  render() {

    return <div>
      <FloatingActionButton style={buttonStyle} secondary={true}>
        <i className="fa fa-search"></i>
      </FloatingActionButton>

      <h3>Cerca</h3>
    </div>;
  }
}
export class HomeRight extends BaseComponent {

  render() {

    return <div>
      <FloatingActionButton style={buttonStyle} secondary={true}>
        <i className="fa fa-user"></i>
      </FloatingActionButton>
      <h3>Fatti trovare animato</h3>
    </div>;
  }
}


export class AnimatedHomeView extends BaseView {

  render() {

    return <AnimatedContent leftChild={<HomeLeft {...this.props}/>}
                            rightChild={<HomeRight {...this.props}/>} focus="center"/>;
  }
}
