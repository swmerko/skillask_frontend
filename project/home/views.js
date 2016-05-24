import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';
import { BaseView } from 'outlinejs/lib/views';

import { AnimatedContent } from '../core/components';


export class HomeLeft extends BaseComponent {

  render() {

    return <div>
      <div className="base-nav-icons">
        <img src="/static/core/media/images/searchIcon.png"/>
      </div>
      <h4>Cerca</h4>
    </div>;
  }
}
export class HomeRight extends BaseComponent {

  render() {

    return <div>
      <div className="base-nav-icons">
        <img src="/static/core/media/images/profileIcon.png"/>
      </div>
      <h4>Fatti trovare</h4>
    </div>;
  }
}


export class AnimatedHomeView extends BaseView {

  render() {

    return <AnimatedContent leftChild={<HomeLeft {...this.props}/>}
                            rightChild={<HomeRight {...this.props}/>} focus="center"/>;
  }
}
