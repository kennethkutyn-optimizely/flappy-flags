import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Input, Switch, Table, Button, Link, RangeSlider, Steps } from 'optimizely-oui';
import { toggleFeature, setVariable } from '../redux/actions'
import Tooltip from './tooltip'


class Controls extends Component {
  constructor(props) {
    super(props)
  }

  onSwitch(featureKey, event) {
    let featureEnabled = !!event.target.checked
    this.props.toggleFeature({
      featureKey: featureKey,
      variationKey: this.props.variationKey,
      enabled: featureEnabled,
    });
  }

  onUpdateVariable(variableKey, event) {
    let variableValue = Number(event.target.value)
    this.props.setVariable({
      variationKey: this.props.variationKey,
      variableKey: variableKey,
      variableValue: variableValue,
    });
  }

  render() {
    return (
      <div>
        { this.props.featureControlsVisible && (
          <Table
            density="loose"
            tableLayoutAlgorithm="fixed">
            <Table.THead>
              <Table.TR>
                <Table.TH width="35%">
                  <h6 className="push--top">
                    { !this.props.experimenting ? 'Feature' : `Variation ${this.props.variationKey}`}
                  </h6>
                </Table.TH>
                <Table.TH />
              </Table.TR>
            </Table.THead>
            <Table.TBody>
              <Table.TR>
                <Table.TD>
                  <div className="force-break">
                    pipes
                  </div>
                </Table.TD>
                <Table.TD>
                  <Tooltip
                    text={'Turn on pipes'}
                    offsetX={'75px'}
                    offsetY={'0px'}
                    direction={'left'}
                    shouldShowTooltip={() => (
                      this.props.step === 1 && !this.props.pipesFeatureEnabled
                    )}
                  />
                  <Switch
                    isDisabled={ this.props.step === 5 }
                    elementId={`${this.props.variationKey}-switch`}
                    checked={ this.props.pipesFeatureEnabled }
                    onClick={ this.onSwitch.bind(this, 'pipesFeatureEnabled') }
                  />
                </Table.TD>
              </Table.TR>
            </Table.TBody>
          </Table>
        )}
        { this.props.variableControlsVisible && (
          <Table
            density="loose"
            tableLayoutAlgorithm="fixed">
            <Table.THead>
              <Table.TR>
                <Table.TH width="35%">Variable</Table.TH>
                <Table.TH>Value: {this.props.gravity} </Table.TH>
              </Table.TR>
            </Table.THead>
            <Table.TBody>
              <Table.TR>
                <Table.TD>
                  <div className="weight--bold">
                    gravity
                  </div>
                  <div className="muted">
                    Integer
                  </div>
                </Table.TD>
                <Table.TD>
                  <div>
                    <input
                      step="1"
                      type="range"
                      min="5"
                      max="24"
                      disabled={ this.props.step === 5 }
                      value={ this.props.gravity }
                      onChange={ this.onUpdateVariable.bind(this, 'gravity') }
                    />
                    <Tooltip
                      offsetX={'150px'}
                      offsetY={'-30px'}
                      direction={'left'}
                      text={'Change gravity'}
                      shouldShowTooltip={() => (
                        this.props.step === 2 && this.props.gravity === 9.8 && this.props.variationKey === 'A'
                      )}
                    />
                  </div>
                </Table.TD>
              </Table.TR>
            </Table.TBody>
          </Table>
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
    width: '430px',
    height: '280px',
  },
  optlyFrameBackground: {
    width: '430px',
    height: '280px',
    position: 'absolute',
    zIndex: -1,
  },
  optlyFrameContent: {
    padding: '40px 10px 18px 10px'
  },
}

const mapStateToProps = (state , props) => {
  return {
    pipesFeatureEnabled: state[`pipesFeatureEnabled${props.variationKey}`],
    gap: state[`gap${props.variationKey}`],
    gravity: state[`gravity${props.variationKey}`],

    experimenting: state.controlSets > 1 || state.step >= 13,
    playedLevel: state.playedLevel,
    featureControlsVisible: state.step < 7 || state.step > 9,
    variableControlsVisible: state.step >= 2 && state.step <= 6 || state.step > 10,

    step: state.step,
  }
}

const mapDispatchToProps = { toggleFeature, setVariable }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls)
