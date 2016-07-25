/**
 * Created by erko on 28/05/16.
 */
import React from 'react';
import Paper from 'material-ui/Paper';


const containerStyle = {
  padding: 20
};

const paperStyle = {
  width: '100%',
  padding: 20,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: 'transparent',
  border: 'solid white thin',
  color: 'white',
  fontWeight: 400
};

export class PaperComponent extends Paper {

  render() {
    return <div style={containerStyle}>
      <Paper style={paperStyle} zDepth={3} {...this.props} />
    </div>;
  }
}
