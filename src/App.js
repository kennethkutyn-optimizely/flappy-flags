import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import Level1 from './level1';
import Level2 from './level2';

function App(props) {

  let level = null;
  if (props.stepNumber <= 7) {
    level = (<Level1 />);
  } else {
    level = (<Level2 />);
  }

  return (
    <div>
      { level }
    </div>
  );
}


const mapStateToProps = (state, props) => {
  return {
    stepNumber: state.step + 1,
  }
}

const mapDispatchToProps = { }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
