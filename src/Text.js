
import React from 'react';
import convertStyle from './convertStyle';

export default class Text {
  render() {
    return <span style={convertStyle(this.props.style)}>{this.props.children}</span>
  }
};


