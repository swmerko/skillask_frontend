import { BaseView } from 'outlinejs/lib/views';
import React from 'react';
import { gettext } from 'outlinejs/lib/utils/translation';

export class BaseLayoutView extends BaseView {
  render() {
    var Content = this.props.content;

    return <div className="wrap">
      <Content { ...this.props.contentProps } delegate={ this.delegate }/>
    </div>;
  }
}
