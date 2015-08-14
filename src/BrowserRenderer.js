import React from 'react';

export default class BrowserRenderer {
  shouldComponentUpdate(nextProps) {
    return nextProps.markup !== this.props.markup;
  }
  render() {
    return (
      <div id="browser" style={styles.container}>
        <h1>Browser Rendered</h1>
        {this.props.markup}
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '0 50px',
  },
};
