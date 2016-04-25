import React from 'react';

import { BaseComponent } from 'outlinejs/lib/components';
import { BaseView } from 'outlinejs/lib/views';

import FloatingActionButton from 'material-ui/lib/floating-action-button';

import { AnimatedContent } from '../core/components';


const buttonStyle = {
  margin: 20
};


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
