
import React from 'react';
import convertStyle from './convertStyle';

export default class View {
  render() {
    return <div style={convertStyle(this.props.style)}>{this.props.children}</div>
  }
};

