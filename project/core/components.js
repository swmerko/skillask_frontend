/**
 * Created by erko on 26/03/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {BaseComponent} from 'outlinejs/lib/components';
import {Row, Col} from 'react-flexgrid';
import jQuery from 'jquery';


export class ReactCSSTransitionGroupComponent extends BaseComponent {

  outAnimation(focus) {
    let leftContainer = ReactDOM.findDOMNode(this.refs.leftContainer);
    let rightContainer = ReactDOM.findDOMNode(this.refs.rightContainer);

    jQuery(leftContainer).removeClass('col-xs-4');
    jQuery(leftContainer).removeClass('col-xs-6');
    jQuery(leftContainer).removeClass('col-xs-8');
    jQuery(rightContainer).removeClass('col-xs-4');
    jQuery(rightContainer).removeClass('col-xs-6');
    jQuery(rightContainer).removeClass('col-xs-8');
    if (focus === 'left') {
      jQuery(leftContainer).addClass('col-xs-8');
      jQuery(rightContainer).addClass('col-xs-4');

    } else if (focus === 'right') {
      jQuery(leftContainer).addClass('col-xs-4');
      jQuery(rightContainer).addClass('col-xs-8');
    } else {
      jQuery(leftContainer).addClass('col-xs-6');
      jQuery(rightContainer).addClass('col-xs-6');
    }
  }

  navigateToSearch() {
    this.response.navigate('search:main', {});
  }

  navigateToProfile() {
    this.response.navigate('profile:main', {});
  }

  goToSearch() {
    if (this.props.focus !== 'left') {
      this.outAnimation('left');
      setTimeout(this.navigateToSearch.bind(this), 300);
    }
  }

  goToProfile() {
    if (this.props.focus !== 'right') {
      this.outAnimation('right');
      setTimeout(this.navigateToProfile.bind(this), 300);
    }
  }

  render() {
    let leftSize = 6;
    let rightSize = 6;

    if (this.props.focus === 'right') {
      leftSize = 4;
      rightSize = 8;
    } else if (this.props.focus === 'left') {
      leftSize = 8;
      rightSize = 4;
    } else {
      leftSize = rightSize = 6;
    }


    return <Row className="center-xs">
      <Col xs={leftSize} className="transition-width-out" ref="leftContainer">
        <div className="box" onClick={this.goToSearch.bind(this)}>
          { this.props.leftChild}
        </div>
      </Col>
      <Col xs={rightSize} className="transition-width-out" ref="rightContainer">
        <div className="box" onClick={this.goToProfile.bind(this)}>
          {this.props.rightChild}
        </div>
      </Col>
    </Row>;
  }
}


export class AnimatedContent extends BaseComponent {

  render() {
    return <ReactCSSTransitionGroupComponent {...this.props}/>;
  }

  //render() {
  //  return <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
  //    <ReactCSSTransitionGroupComponent {...this.props}/>
  //  </ReactCSSTransitionGroup>;
  //}
}
