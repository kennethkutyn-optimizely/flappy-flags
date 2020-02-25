import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input, Switch, Table, Button, Link, RangeSlider, Steps } from 'optimizely-oui';
import { addControlSet, nextStep, enableFeatureControls, enableVariableControls } from '../redux/actions'
import Controls from './controls';
import Tooltip from './tooltip'


class OptimizelyApp extends Component {
  constructor(props) {
    super(props)
  }

  addVariation() {
    this.props.addControlSet();
  }

  runExperiment() {
    this.props.nextStep();
  }

  render() {
    const UI = (
      <div style={styles.card}>
        <span style={styles.title}>Optimizely Application</span>
        <div style={styles.optlyFrame}>
          <div style={styles.optlyFrameBackground}>
            <img src="/assets/computer.svg" />
          </div>
          <div className="flex flex--column" style={styles.optlyFrameContent}>
            { this.props.step > 8 && (
              <Table
                density="loose"
                tableLayoutAlgorithm="fixed">
                <Table.THead>
                  <Table.TR>
                    <Table.TH width="35%">
                      <h6>
                        SDK Key:
                        <span className="push-quad--left">
                          8k4bZ37
                        </span>
                      </h6>
                    </Table.TH>
                  </Table.TR>
                </Table.THead>
              </Table>
            )}
            { this.props.controlSets >= 1 && (
              <Controls
                variationKey={'A'}
              />
            )}
            { this.props.controlSets === 1 && this.props.step === 3 && (
              <Button
                type={"button"}
                style={'highlight'}
                isDisabled={this.props.playedLevel < 2}
                onClick={this.addVariation.bind(this)}>
                Add Variation
              </Button>
            )}
            <Tooltip
              offsetX={'155px'}
              offsetY={'237px'}
              direction={'up'}
              text={'Setup an experiment'}
              shouldShowTooltip={() => (
                this.props.controlSets === 1 && this.props.step === 3
              )}
            />
            { this.props.controlSets === 2 && (
              <div className="push-quad--top">
                <Controls
                  variationKey={'B'}
                />
              </div>
            )}
            { this.props.step === 4 && (
              <Button
                type={"button"}
                style={'highlight'}
                onClick={this.runExperiment.bind(this)}>
                Run an Experiment
              </Button>
            )}
            { this.props.step > 11 && this.props.step < 13 && (
              <h6 className="push-double--left push-double--top">
                <span className="muted push-double--right">Event</span>
                <span className="push-quad--left weight--bold">played_game</span>
              </h6>
            )}
            <Tooltip
              offsetX={'192px'}
              offsetY={'469px'}
              direction={'up'}
              text={'See the results'}
              shouldShowTooltip={() => (
                this.props.step === 4
              )}
            />
          </div>
        </div>
      </div>
    )

    return (
      <div>
        { this.props.step > 0 && (
          <div>{ UI }</div>
        )}
      </div>
    )
  }
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    padding: '10px',
    fontFamily: "Verdana,sans-serif",
    fontWeight: '500',
  },
  optlyFrame: {
    width: '350px',
    height: '550px',
    padding: '10px',
    //height: '280px',
  },
  optlyFrameBackground: {
    width: '350px',
    margin: '-10px',
    //height: '280px',
    position: 'absolute',
    zIndex: -1,
  },
  optlyFrameContent: {
    padding: '40px 10px 18px 10px'
  },
}

const mapStateToProps = (state , props) => {
  return {
    controlSets: state.step >= 13 ? 2 : state.controlSets,
    playedLevel: state.playedLevel,
    variableControlsEnabled: state.variableControlsEnabled,
    step: state.step,
  }
}

const mapDispatchToProps = {
  addControlSet,
  nextStep,
  enableVariableControls,
  enableFeatureControls,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OptimizelyApp)
