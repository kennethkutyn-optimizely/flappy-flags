import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, } from 'optimizely-oui';
import { reset, nextStep, viewDocs, createAccount, removeControlSet, enableNext } from '../redux/actions'
import Tooltip from './tooltip'

function Congrats(props) {

  function createAccount() {
    window.open('https://www.optimizely.com/free-trial/?modal=signup&utm_campaign=flappybird_demo');
    props.createAccount()
  }

  function seeCode() {
    props.removeControlSet();
    props.nextStep();
    props.enableNext();
  }

  function seeFAQ() {
    window.open('https://docs.developers.optimizely.com/full-stack/docs/faq', '_blank');
    props.viewDocs()
  }

  function seeDocs() {
    window.open('https://docs.developers.optimizely.com/full-stack/docs/quickstarts', '_blank');
    props.viewDocs()
  }

  return (
    <div style={styles.container}>
      <div style={styles.congrats}> 🎉 </div>
      <div style={styles.buttons}>
        <div className="soft">
          { props.step < 10 && (
            <Button
              type={"button"}
              onClick={seeCode}>
              See Code
            </Button>
          )}
          { props.step > 10 && (
            <Button
              type={"button"}
              onClick={seeFAQ}>
              See FAQ
            </Button>
          )}
        </div>
        <div className="soft">
          <Button
            type={"button"}
            style={'highlight'}
            onClick={createAccount}>
            Create an Account
          </Button>
        </div>
        <div style={{position: 'absolute'}}>
          <Tooltip
            offsetX={'143px'}
            offsetY={'9px'}
            direction={'left'}
            text={'Create account'}
            shouldShowTooltip={() => (
              true
            )}
          />
        </div>
      </div>
      <div style={styles.buttons}>
        <Button
          type={"button"}
          style={'plain'}
          onClick={props.reset}>
          Reset Demo
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state , props) => {
  return {
    step: state.step,
  }
}

const mapDispatchToProps = {
  reset,
  enableNext,
  nextStep,
  viewDocs,
  createAccount,
  removeControlSet,
}

const styles = {
  container: {
    marginTop: '40px',
  },
  congrats: {
    fontSize: '80px',
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Congrats)
