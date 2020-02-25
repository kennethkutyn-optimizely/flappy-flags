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
import { toggleCode, previousStep, nextStep } from './redux/actions'

function Level2(props) {

  const instructions = (
    <StepInstructions
      instructions={STEP_INSTRUCTIONS}
      activeInstruction={props.stepNumber}
    />
  )

  const optlyApp = props.stepNumber < 16 && (
    <div className="optly-app">
      <OptimizelyApp />
    </div>
  )

  const appCode = props.stepNumber < 15 && (
    <YourAppCode />
  )

  const mobileApps = props.stepNumber == 15 && (
    <div className="mobile-app">
      <MobileApps />
    </div>
  )

  const congrats = props.stepNumber == 16 && (
    <Congrats />
  )

  return (
    <div style={styles.root}>
      <div>
        <div style={styles.panel}>
          {instructions}
          {optlyApp}
          {mobileApps}
          {appCode}
          {congrats}
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
