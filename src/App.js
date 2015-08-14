
import React from 'react';
import View from './View';
import Text from './Text';
import BrowserRenderer from './BrowserRenderer';
import CSSLayoutRenderer from './CSSLayoutRenderer';
import CodeMirror from './CodeMirror';
// import Text from './Text';

const DEFAULT = `
var markup = (
  <View style={{width: 200, height: 300}}>
    <View style={{flex: 1, margin: 5}}>
      <Text style={{padding: 10}}>Awesome</Text>
      <View style={{height: 10}}/>
    </View>
    <View style={{flex: 1, margin: 5}}/>
  </View>
);
`;

function runCode(code, React, View, Text) {
  return eval(code + '\n;markup')
}

function debounce(fn, time) {
  var wait = null;
  return function () {
    if (wait) clearTimeout(wait);
    wait = setTimeout(() => {
    }, time);
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: DEFAULT,
      markup: null,
    };
    // this.boundyEval = debounce(::this.eval, 100);
  }

  componentDidMount() {
    this.run(this.state.text);
  }

  run(text) {
    let code;
    try {
      code = window.babel.transform(text).code;
    } catch (e) {
      return;
    }
    var markup;
    try {
      markup = runCode(code.split(/\n/g).slice(1).join('\n'), React, View, Text);
    } catch (e) {
      console.log('eval fail', e);
      return;
    }
    if (!markup) {
      return;
    }
    this.setState({markup});
  }

  onChange(text) {
    this.run(text);
    this.setState({text});
  }

  render() {
    return (
      <div style={styles.container}>
        <CodeMirror
          value={this.state.text}
          smartIndent={true}
          lineWrap={true}
          style={{width: 700, height: 1000}}
          automatchparens={true}
          onChange={val => this.onChange(val)}
        />
          <BrowserRenderer markup={this.state.markup} />
          <CSSLayoutRenderer markup={this.state.markup} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
    height: 600,
    display: 'flex',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
  },
};
