import React from 'react';
var Layout = require('./calcLayout');
import extractStyles from './extractStyles';

function renderLayout(layout, config, parentStyles) {
  parentStyles = parentStyles || {};
  let {children, ...style} = layout;
  const {
    margin, marginTop, marginLeft, marginRight, marginBottom,
    ...otherStyles
  } = config.style;

  let parentTop = parentStyles.borderWidth || parentStyles.borderTopWidth;
  if (parentTop) {
    style.top -= parentTop;
  }
  let parentLeft = parentStyles.borderWidth || parentStyles.borderTopWidth;
  if (parentLeft) {
    style.left -= parentLeft;
  }

  if (config.text) {
    return (
      <span style={{...otherStyles, ...style}}>
        {config.text}
      </span>
    );
  }
  return (
    <div style={{...otherStyles, ...style}}>
      {children && children.map((child, i) => renderLayout(child, config.children[i], config.style))}
    </div>
  );
}

function cloneDeep(one) {
  if ('object' !== typeof one) {
    return one;
  }
  if (Array.isArray(one)) {
    return one.map(cloneDeep);
  }
  var res = {};
  for (var name in one) {
    res[name] = cloneDeep(one[name]);
  }
  return res;
}

export default class CSSLayoutRenderer {
  shouldComponentUpdate(nextProps) {
    return nextProps.markup !== this.props.markup;
  }

  render() {
    if (!this.props.markup) {
      return (
        <div style={styles.container}>
          <h1>CSSLayout</h1>
          No Markup
        </div>
      );
    }
    const config = extractStyles(this.props.markup);
    const mutableConfig = cloneDeep(config);
    console.log(config, mutableConfig);
    Layout.fillNodes(mutableConfig);
    Layout.computeLayout(mutableConfig);
    const layout = Layout.extractNodes(mutableConfig);
    return (
      <div style={styles.container}>
        <h1>CSSLayout</h1>
        <div id="csslayout" style={styles.rendered}>
          {renderLayout(layout, config)}
        </div>
        Config:
        <pre>{JSON.stringify(config, null, 2)}</pre>
        Layout
        <pre>{JSON.stringify(layout, null, 2)}</pre>
      </div>
    );
  }
}

const styles = {
  container: {
  },
  rendered: {
    position: 'relative',
  },
};
