import React from 'react';
import { connect } from 'react-redux'
import StepInstructions from './components/step-instructions';
import { toggleCode, previousStep, nextStep } from './redux/actions'

function Level2(props) {

  return (
    <div style={styles.root}>
      <div>
        <div style={styles.panel}>
          FAQ
        </div>
      </div>
      <Copyright />
    </div>
  );
}


const mapStateToProps = (state, props) => {
  return {
    stepNumber: state.step + 1,
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Level2)

const styles = {
  root: {
    margin: '20px',
  },
  panel: {
    width: '100%',
    minHeight: '700px',
    overflow: 'auto',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
}
