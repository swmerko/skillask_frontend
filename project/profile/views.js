import React from 'react';

import { BaseView } from 'outlinejs/lib/views';

import { AnimatedContent } from '../core/components';
import { ProfileComponent } from './components';
import { SearchComponent } from '../search/components';


//export class ProfileContentViewOld extends BaseView {
//  goToSearch() {
//    this.response.navigate('search:main', {});
//  }
//
//  render() {
//
//    return <Row className="center-xs">
//      <Col xs={2} className="transition-width">
//        <div className="box" onClick={this.goToSearch.bind(this)} ref="searchContainer">
//          <SearchComponent delegate={ this.delegate } userSkills={this.props.userSkills}/>
//        </div>
//      </Col>
//      <Col xs={8} className="transition-width">
//        <div className="box" ref="profileContainer">
//          <ProfileComponent />
//        </div>
//      </Col>
//    </Row>;
//  }
//}


export class ProfileContentView extends BaseView {


  render() {
    return <AnimatedContent leftChild={<SearchComponent delegate={ this.delegate } {...this.props}/>}
                            rightChild={<ProfileComponent delegate={ this.delegate } {...this.props} />}
                            focus="right"/>;
  }
}
