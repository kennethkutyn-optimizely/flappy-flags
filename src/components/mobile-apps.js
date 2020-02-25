import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TabNav } from 'optimizely-oui';
import { addControlSet, nextStep, enableFeatureControls, enableVariableControls } from '../redux/actions'
import FlappyBird from './flappy-bird';
import Tooltip from './tooltip'


class MobileApps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variation: 'A',
      showTooltip: props.step < 13,
    }
  }

  switchTab(variation) {
    this.setState({
      variation: variation,
      showTooltip: false,
    })
  }

  render() {
    const tabs = this.props.experimenting && (
      <div style={styles.tabs}>
        <TabNav
          activeTab={this.state.variation}
          style={['dashboard']}
        >
          <TabNav.Tab
            onClick={this.switchTab.bind(this, 'A')}
            tabId="A"
          >
            Variation A
          </TabNav.Tab>
          <TabNav.Tab
            onClick={this.switchTab.bind(this, 'B')}
            tabId="B"
          >
            Variation B
            <Tooltip
              offsetX={'-70px'}
              offsetY={'19px'}
              direction={'up'}
              text={'Switch variation'}
              shouldShowTooltip={() => (
                this.state.showTooltip
              )}
            />
          </TabNav.Tab>
        </TabNav>
      </div>
    )

    const variationAstyle = {
      display: this.state.variation === 'A' ? 'block' : 'none',
    }

    const variationBstyle = {
      display: this.state.variation === 'B' ? 'block' : 'none',
    }

    return (
      <div className="flex flex--column">
        { tabs }
        <div className="flex flex--row">
          <div style={variationAstyle}>
            <FlappyBird
              id={'A'}
              pipesFeatureEnabled={this.props.pipesFeatureEnabledA}
              gap={this.props.gapA}
              gravity={this.props.gravityA}
            />
          </div>
          <div style={variationBstyle}>
            <FlappyBird
              id={'B'}
              pipesFeatureEnabled={this.props.pipesFeatureEnabledB}
              gap={this.props.gapB}
              gravity={this.props.gravityB}
            />
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  tabs: {
    display: 'flex',
    justifyContent: 'center',
  }
}

const mapStateToProps = (state , props) => {
  return {
    experimenting: state.controlSets > 1 || state.step >= 13,
    step: state.step,

    pipesFeatureEnabledA: state.pipesFeatureEnabledA,
    gapA: state.gapA,
    gravityA: state.gravityA,

    pipesFeatureEnabledB: state.pipesFeatureEnabledB,
    gapB: state.gapB,
    gravityB: state.gravityB,
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
)(MobileApps)
