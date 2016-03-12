import { BaseLayoutView } from 'outlinejs/lib/views';
import React from 'react';
import { gettext } from 'outlinejs/lib/utils/translation';

export class LayoutView extends BaseLayoutView {
  render() {
    var Content = this.props.content;

    return <div className="wrap">
      <Content { ...this.props.contentProps } delegate={ this.delegate }/>
    </div>;
  }
}
