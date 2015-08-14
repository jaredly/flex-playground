
import React from 'react';
import measureText from './measureText';

export default function extractStyles(markup) {
  if (typeof markup === 'string') {
    return;
  }
  var children = [];
  React.Children.map(markup.props.children, child => {
    const res = extractStyles(child);
    if (res) {
      children.push(res);
    }
  });
  var style = {...markup.props.style};
  var text;
  if (typeof markup.props.children === 'string') {
    style.measure = measureText.bind(null, markup.props.children);
    text = markup.props.children;
  }
  return {
    text,
    style,
    children: !!children.length && children,
  };
};

