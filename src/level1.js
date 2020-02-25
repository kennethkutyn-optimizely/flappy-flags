import React from 'react';
import { connect } from 'react-redux'
import OptimizelyApp from './components/optly-app';
import FlappyBird from './components/flappy-bird';
import YourAppCode from './components/your-app-code';
import Results from './components/results';
import Copyright from './components/copyright';
import MobileApps from './components/mobile-apps';
import Congrats from './components/congrats';
import { STEP_INSTRUCTIONS } from './constants';
import StepInstructions from './components/step-instructions';
import { Input, Switch, Table, Button, Link, RangeSlider, Steps } from 'optimizely-oui';
import { toggleCode, previousStep, nextStep } from './redux/actions'

function Level1(props) {

  const optlyApp = props.stepNumber != 0 && props.stepNumber != 6 && props.stepNumber != 7 && props.stepNumber != 8 && (
    <div className="optly-app">
      <OptimizelyApp />
    </div>
  )

  const appCode = props.stepNumber >= 8 && (
    <YourAppCode />
  )

  const mobileApps = props.stepNumber < 6 && (
    <div className="mobile-app">
      <MobileApps />
    </div>
  )

  const results = props.stepNumber === 6 && (
    <div className="results">
      <div className="flex flex--column">
        <Results />
      </div>
    </div>
  )

  const congrats = props.stepNumber === 7 && (
    <Congrats />
  )

  const instructions = (
    <StepInstructions
      instructions={STEP_INSTRUCTIONS}
      activeInstruction={props.stepNumber}
    />
  )

  return (
    <div style={styles.root} className={`demo-step-${props.stepNumber} demo-control-sets-${props.controlSets}`}>
      <div>
        <div style={styles.panel}>
          {instructions}
          {optlyApp}
          {appCode}
          {mobileApps}
          {results}
          {congrats}
        </div>
      </div>
      <Copyright />
    </div>
  );
}


const mapStateToProps = (state, props) => {
  return {

    controlSets: state.controlSets,

    stepNumber: state.step + 1,
  }
}

const mapDispatchToProps = { toggleCode, nextStep, previousStep }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Level1)

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
