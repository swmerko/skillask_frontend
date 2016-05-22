import React from 'react';

import { BaseView } from 'outlinejs/lib/views';

import { SearchComponent } from './components';
import { ProfileComponent } from '../profile/components';
import { AnimatedContent } from '../core/components';

//export class SearchContentViewOld extends BaseView {
//
//  render() {
//
//    return <Row className="center-xs">
//      <Col xs={8} className="transition-width">
//        <div className="box" ref="searchContainer">
//          <SearchComponent delegate={ this.delegate } userSkills={this.props.userSkills}/>
//        </div>
//      </Col>
//      <Col xs={2} className="transition-width">
//        <div className="box" ref="profileContainer" onClick={this.goToProfile.bind(this)}>
//          <ProfileComponent />
//        </div>
//      </Col>
//    </Row>;
//  }
//}

export class SearchContentView extends BaseView {


  render() {
    return <AnimatedContent leftChild={<SearchComponent delegate={ this.delegate } {...this.props}/>}
                            rightChild={<ProfileComponent delegate={ this.delegate } {...this.props}/>}
                            focus="left"/>;
  }
}
