import React, { Component } from 'react';
import { connect } from 'react-redux'
import { UnControlled as CodeMirror} from 'react-codemirror2';
import { Button } from 'optimizely-oui';
import { increaseCodeRevision, enableNext } from '../redux/actions';
import { getAppCode } from '../modules/app-code';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/nord.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');


class YourAppCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: getAppCode(props.step - 7, {
        isEnabledA: props.isEnabledA,
        gravityA: props.gravityA,

        isEnabledB: props.isEnabledB,
        gravityB: props.gravityB,
      }),
    }
  }

  saveCode() {
    console.log(this.state.code);
  }


  render() {
    const props = this.props;
    const code =  getAppCode(props.step - 7, {
      isEnabledA: props.isEnabledA,
      gravityA: props.gravityA,

      isEnabledB: props.isEnabledB,
      gravityB: props.gravityB,
    })

    return (
      <div style={styles.container}>
        <div style={styles.title}>Flappy Bird Code</div>
        <div style={styles.ideFrame}>
          <div style={styles.ideFrameBackground}>
            <img src="/assets/ide.svg" />
          </div>
          <CodeMirror
            className="your-app-code"
            options={{
              mode: 'javascript',
              theme: 'nord',
              lineNumbers: true,
              readOnly: false,
            }}
            value={code}
            onChange={(editor, data, value) => {
              this.setState({ code: value });
            }}
          />
        </div>
        {
          false && (
            <div>
              <div style={styles.buttons}>
                <Button
                  type={"button"}
                  style={"highlight"}
                  onClick={this.saveCode.bind(this)}>
                  Deploy Changes
                </Button>
              </div>
              <div style={styles.buttons}>
                <Button
                  type={"button"}
                  style={'plain'}
                  onClick={props.increaseCodeRevision}>
                  Reset Code
                </Button>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  ideFrame: {
  },
  ideFrameBackground: {
    position: 'absolute',
    zIndex: -1,
    width: '600px',
  },
  container: {
    padding: '10px 20px',
    height: '596px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontFamily: "Verdana,sans-serif",
    fontWeight: '500',
    padding: '0px 10px 10px 10px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state , props) => {
  return {
    step: state.step,
    codeRevision: state.codeRevision,
    gravityA: state.gravityA,
    isEnabledA: state.pipesFeatureEnabledA,

    gravityB: state.gravityB,
    isEnabledB: state.pipesFeatureEnabledB,
  }
}

const mapDispatchToProps = {
  increaseCodeRevision,
  enableNext,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourAppCode)
