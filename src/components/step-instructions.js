import React from 'react';
import { Button, } from 'optimizely-oui';
import { connect } from 'react-redux'
import { nextStep, previousStep } from '../redux/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tooltip from './tooltip'


function getTooltipText(step) {
  switch (step) {
    case 0:
      return 'Add a feature';
    case 1:
      return 'Add a variable';
    case 2:
      return 'Add a variation';
    case 3:
      return 'Run an experiment';
    case 7:
      return 'Install Optimizely';
    case 8:
      return 'Connect the SDK';
    case 9:
      return 'Add a Feature Flag';
    case 10:
      return 'Add a Feature Variable';
    case 11:
      return 'Track Events';
    case 12:
      return 'Experiment';
    case 13:
      return 'Use Optimizely';
    case 14:
      return 'Get Started';
    default:
      return '';
  }
}

function getTooltipOffset(step) {
  switch (step) {
    case 0:
      return '230px';
    case 1:
      return '226px';
    case 2:
      return '221px';
    case 3:
      return '196px';
    case 7:
      return '207px';
    case 8:
      return '206px';
    case 9:
      return '197px';
    case 10:
      return '172px';
    case 11:
      return '235px';
    case 12:
      return '247px';
    case 13:
      return '220px';
    case 14:
      return '243px';
    default:
      return '';
  }
}

function getDisplayNumber(step) {
  if (step > 6) return step - 7;
  return step + 1;
}

function StepInstructions(props) {

  const activeIndex = props.activeInstruction - 1;
  const instructionsList = props.instructions.map((instruction, index) => {
    return (
      <div key={index} style={styles.stepContainer}>
        <div style={styles.titleContainer}>
          <div style={styles.number} className="flex--dead-center">{getDisplayNumber(index)}</div>
          <h2 style={styles.title}>{instruction.title}</h2>
        </div>
        <div style={styles.subTitleContainer}>
          <span style={styles.subtitle}>{instruction.text}</span>
        </div>
      </div>
    )
  });

  const backButton = props.step > 6 && (
    <div className="push--right">
      <Button
        onClick={props.previousStep}
      >
        Back
      </Button>
    </div>
  )

  const nextButton = props.step !== 6 && (
    <Button
      style={"highlight"}
      onClick={props.nextStep}
      isDisabled={!props.nextEnabled}
    >
      Next
    </Button>
  )

  return (
    <div style={styles.instructions}>
      <div style={styles.content}>
        <ReactCSSTransitionGroup transitionName="instruction" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
          { instructionsList[activeIndex] }
        </ReactCSSTransitionGroup>
        <div style={styles.buttonRow}>
          <div style={styles.buttons}>
            {backButton}
            {nextButton}
          </div>
          <Tooltip
            offsetX={getTooltipOffset(props.step)}
            offsetY={'-53px'}
            direction={'down'}
            text={getTooltipText(props.step)}
            shouldShowTooltip={() => (
              props.nextEnabled && getTooltipText(props.step).length > 0
            )}
          />
        </div>
      </div>
    </div>
  )
}

const styles = {
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    width: '360px',
    height: '300px',
    display: 'flex',
  },
  instructions: {
    marginTop: '43px',
    marginRight: '20px',
    zIndex: '10',
    padding: '10px 20px',
    background: 'white',
    border: '1px solid rgb(0, 55, 255)',
    borderRadius: '5px',
    width: '360px',
    height: '300px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.15)',
  },
  buttonRow: {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    width: '350px',
    padding: '30px',
    justifyContent: 'end',
  },
  subtitle: {
    marginLeft: '35px',
  },
  title: {
    marginBottom: '0px',
    lineHeight: 'unset',
  },
  subTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    position: 'absolute',
    width: '300px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  number: {
    backgroundColor: '#514FFF',
    borderRadius: '20px',
    color: 'white',
    width: '25px',
    height: '25px',
    display: 'flex',
    marginRight: '10px',
    fontWeight: '800',
  }
}

const mapStateToProps = (state , props) => {
  return {
    nextEnabled: state.nextEnabled,
    step: state.step,
  }
}

const mapDispatchToProps = {
  previousStep,
  nextStep,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepInstructions)
