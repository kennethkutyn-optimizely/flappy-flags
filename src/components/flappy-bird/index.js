import React, { Component } from 'react';
import { Input, Switch, Table, Button, Link, RangeSlider, Steps } from 'optimizely-oui';
import { setRafInterval, clearRafInterval } from './util/raf-interval';
import './App.css';
import { STEP_INSTRUCTIONS } from '../../constants';
import { connect } from 'react-redux'
import { playedGame, nextStep, enableNext } from '../../redux/actions'
import ToolTip from '../tooltip'

const requireContext = require.context("./flappybird", true, /^\.\/.*\.png$/);
const keys = requireContext.keys();
const images = keys.map(requireContext);
const map = {};

function getTooltipText(props) {
  if (props.step === 0) {
    return 'Try playing with no pipes';
  } else if (props.step === 1 && props.pipesFeatureEnabled) {
    return 'Try playing with pipes';
  } else if (props.step === 2 && props.gravity !== 9.8) {
    return 'Try with different gravity';
  } else if (props.step === 3 && props.id === 'B' && props.playedLevel !== 3) {
    return 'Try playing this variation';
  }

  return 'Play';
}

function getOffsetLeft(props) {
  if (props.step === 0) {
    return '72px';
  } else if (props.step === 1 && props.pipesFeatureEnabled) {
    return '80px';
  } else if (props.step === 2 && props.gravity !== 9.8) {
    return '72px';
  } else if (props.step === 3 && props.id === 'B' && props.playedLevel !== 3) {
    return '75px';
  }

  return '72px';
}

class Bg {
    constructor(config) {
      let canvas = document.getElementById(config.id),
          ctx = canvas.getContext('2d');
      this.ctx = ctx;
      this.init(config);
    }
    init(config) {
      this.initBg(config);
      if (config.pipesFeatureEnabled) {
        config.pipe.forEach( (v) => {
          this.initPipe(v,config.pipespace);
        });
      }
      this.initLand(config);
    }
    initImg(key) {
      return map[key];
    }
    initBg() {
      let img = this.initImg('bg_day');
      this.ctx.drawImage(img,0,0);
    }
    initLand(config) {
      let img = this.initImg('land');
      this.ctx.drawImage(img,config.land,400);
      this.ctx.drawImage(img,config.land + 288,400);
    }
    initPipe(config, pipespace) {
      let img1 = this.initImg('pipe_down');
      let img2 = this.initImg('pipe_up');
      this.ctx.drawImage(img1,config.x,config.y);
      this.ctx.drawImage(img2,config.x,config.y + pipespace.y + 320);
    }
}

class Score {
  constructor(config) {
    config = config || {};
    this.init(config);
  }

  init(config) {
    let canvas = document.getElementById(config.id)
    let ctx = canvas.getContext('2d');
    let scoreString = String(config.score || 0);
    let numDigits = scoreString.length
    let startingPoint = 142 - ((15 * numDigits) / 2)
    for (let i = 0; i < numDigits; i++) {
      let digit = scoreString[i];
      let digitImage = map[`number_score_0${digit}`]
      ctx.drawImage(digitImage, startingPoint + 15 * i, 100)
    }
  }
}

class Bird {
    constructor(config) {
      config = config || {};
      this.init(config);
    }
    init(config) {
      let x = config.x !== undefined ? config.x : 300,
          y = config.y !== undefined ? config.y : 232,
          width = config.width !== undefined ? config.width : 30,
          height = config.height !== undefined ? config.height : 30,
          img = config.img !== undefined ? config.img : 0,
          rotate = config.rotate !== undefined ? config.rotate : 0,
          canvas = document.getElementById(config.id),
          ctx = canvas.getContext('2d');
      // this.clear(ctx);
      this.ctx = ctx;
      ctx.fillStyle = "#fff";
      // ctx.fillRect(x,y,width,height);
      img = this.img(img);
      rotate ? this.rotate(img,x,y,rotate) : ctx.drawImage(img, x, y);
    }
    clear() {
      this.ctx.clearRect(0,0,288,512);
    }
    img(index) {
      return map[`bird2_${index}`];
    }
    rotate(img,x,y,rotate) {
      this.ctx.save();
      this.ctx.translate(x + img.width / 2,y + img.height / 2);
      this.ctx.rotate(rotate*Math.PI/180);
      this.ctx.drawImage(img,-img.width / 2,-img.height / 2);
      this.ctx.restore();
    }
}

class Hud {
  constructor(config) {
    config = config || {};
    this.init(config);
  }
  init(config) {
    const type = config.type || 'start',
          canvas = document.getElementById(config.id),
          ctx = canvas.getContext('2d');
    this.ctx = ctx;
    switch (type) {
      case 'start':
        this.drawTitle(this.initImg('title'));
        this.drawContent(this.initImg('tutorial'));
        break;

      default:
        break;
    }
  }
  drawTitle(img, x = 55, y = 100) {
    this.ctx.drawImage(img, x, y);
  }
  drawContent(img, x = 87, y = 200) {
    this.ctx.drawImage(img, x, y);
  }
  initImg(key) {
    return map[key];
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'yyj',
      frames: 60,
      ratio: 100/1,
      distanceFlown: 0,
      land: 0,
      score: 0,
      bestScore: 0,
      pipespace: {
        x: 118,
        y: props.gap,
      },
      pipe: [{
        x: 288,
        y: this.getRandomVerticalDistance()
      },{
        x: 288 + 118 + 52,
        y: this.getRandomVerticalDistance()
      },{
        x: 288 + 118 * 2 + 52 * 2,
        y: this.getRandomVerticalDistance()
      }],
      velocity: 0,
      gravity: props.gravity,
      img: 0,
      pos: {
        top: 232,
        left: 100
      },
      gameover: false,
      introScreen: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.preloadImage(this.initCanvas.bind(this));
  }

  componentWillUpdate() {
    if (!this.birdObj) return;
    this.bgObj.init({
      land: this.state.land,
      pipespace: {
        x: this.state.pipespace.x,
        y: this.props.gap,
      },
      pipe: this.state.pipe,
      pipesFeatureEnabled: this.props.pipesFeatureEnabled,
      id: this.props.id,
    });
    this.birdObj.init({
      x:this.state.pos.left,
      y:this.state.pos.top,
      img: this.state.img,
      rotate: this.state.velocity < 0 ? -45 : (this.state.velocity === 0 ? 0 : 45),
      id: this.props.id,
    });
    this.scoreObj.init({
      score: this.state.score,
      id: this.props.id,
    });
  }
  preloadImage(callback,arg) {
    keys.forEach((value,index) => {
      let img = new Image();
      img.src = images[index];
      img.onload = () => {
        map[value.replace('./','').replace('.png','')] = img;
        if(Object.keys(map).length === keys.length) callback(arg);
      };
    });
  }
  initCanvas() {
    this.bgObj = new Bg({
      land: this.state.land,
      pipespace: {
        x: this.state.pipespace.x,
        y: this.props.gap,
      },
      pipe: this.state.pipe,
      pipesFeatureEnabled: this.props.pipesFeatureEnabled,
      id: this.props.id,
    });
    this.hudObj = new Hud({
      id: this.props.id,
    });
  }
  initEngine() {
    window.addEventListener('keyup', this.handleKeyUp);
    window.document.getElementById(this.props.id).addEventListener('mousedown', this.handleKeyUp);
    this.timer1 = this.setFlyInterval.call(this);
    this.timer2 = this.setRunInterval.call(this);
  }
  setFlyInterval() {
    return setRafInterval(() => {
      this.setState({
        img: this.state.img < 2 ? this.state.img + 1 : 0
      });
    },100);
  }

  getRandomVerticalDistance() {
    return Math.random() * -260 - 40
  }

  computeScore(distanceFlown, pipeSpace, pipeWidth) {
    const pointLength = pipeSpace + pipeWidth;
    const startingDistance = 0
    const score = Math.floor((distanceFlown - startingDistance) / pointLength);
    return score > 0 ? score : 0;
  }

  setRunInterval() {
    let time = 1 / this.state.frames;
    return setRafInterval(() => {
      let v = this.state.velocity + this.props.gravity * time;
      let pipe = this.state.pipe;
      if(pipe[0].x >> 0 < -52) {
        pipe.shift();
        pipe.push({
          x: pipe[1].x + this.state.pipespace.x + 52,
          y: this.getRandomVerticalDistance()
        })
      }

      const distanceFlown = this.state.distanceFlown + 2
      const score = this.computeScore(distanceFlown, this.state.pipespace.x, 52);

      this.setState({
        land: (this.state.land - 2) >> 0 <= -288 ? 0 : this.state.land - 2,
        pipe: pipe.map((v) => ({x:v.x - 2, y: v.y})),
        velocity: v,
        pos: {
          top: this.state.pos.top + v * this.state.ratio * time,
          left: this.state.pos.left
        },
        distanceFlown,
        score,
      });

      var groundCollision = this.checkGroundCollision.call(this);
      if(this.state.pos.left + 38 >= this.state.pipe[0].x && this.checkPipeCollision.call(this) || groundCollision){
        clearRafInterval(this.timer1);
        clearRafInterval(this.timer2);
      }
    },time * 1000);
  }

  finishGame() {
    let level = 0
    if (this.props.pipesFeatureEnabled) level = 1
    if (this.props.gravity !== 9.8) level = 2
    if (this.props.id === 'B') level = 3

    this.props.playedGame({ level });
    if (level === this.props.step) {
      this.props.enableNext();
    }
    this.setState({
      gameover: true,
      bestScore: Math.max(this.state.score, this.state.bestScore),
    })
  }

  checkGroundCollision() {
    let gameover = false
    if (this.state.pos.top + 38 >= 400) {
      gameover = true;
    }
    gameover && this.finishGame();
    return gameover;
  }

  checkPipeCollision() {
    let gameover = false,
        {left:birdLeft,top:birdTop} = this.state.pos,
        birdPos = {
          top: birdTop + 10,
          bottom: birdTop + 38,
          left: birdLeft + 10,
          right: birdLeft + 38
        },
        pipePos = {};
    for(let i = 0; i < 2; i++){
      let {x,y} = this.state.pipe[i];
      pipePos.top = y + 320;
      pipePos.bottom = y + 320 + this.props.gap;
      pipePos.left = x;
      pipePos.right = x+52;

      if (birdPos.right >= pipePos.left && birdPos.left <= pipePos.right && (birdPos.top <= pipePos.top ||
          birdPos.bottom >= pipePos.bottom)) {
        if (this.props.pipesFeatureEnabled) {
          gameover = true;
          break;
        }
      }
    }
    gameover && this.finishGame();
    return gameover;
  }
  handleChange(event, key = 'value') {
    if (/\./.test(key)) {
      const baseStateName = key.split('.')[0];
      const childStateName = key.split('.')[1];
      this.setState({
        [baseStateName]: {
          ...this.state[baseStateName],
          [childStateName]: +event.target.value,
        }
      });
      return;
    }
    this.setState({
      [key]: +event.target.value || event.target.value,
    });
  }
  handleKeyUp(event) {
    if(event.keyCode === 38 || event.type === 'mousedown') {
      this.setState({
        velocity: -4
      });
    }
  }
  start = () => {
    if(this.state.velocity) return;
    this.birdObj = new Bird({
      x: this.state.pos.left,
      y: this.state.pos.top,
      img: this.state.img,
      id: this.props.id,
    });
    this.scoreObj = new Score({
      score: this.state.score,
      id: this.props.id,
    });
    this.initEngine();
    this.setState({
      introScreen: false,
    });
  }

  restart = () => {
    this.setState({
      pos: {
        top: 232,
        left: 100
      },
      pipe: [{
        x: 288,
        y: this.getRandomVerticalDistance()
      }, {
        x: 288 + 118 + 52,
        y: this.getRandomVerticalDistance()
      }, {
        x: 288 + 118 * 2 + 52 * 2,
        y: this.getRandomVerticalDistance()
      }],
      velocity: 0,
      gameover: false,
      score: 0,
      distanceFlown: 0,
    });
    this.initEngine();
  }
  render() {
    const { gameover, pipespace, g } = this.state;
    return (
      <div style={styles.appContainer} className="flappy-bird-container">
        <div style={styles.phoneBackground}>
          <ToolTip
            text={getTooltipText(this.props)}
            content={STEP_INSTRUCTIONS[0]}
            offsetX={getOffsetLeft(this.props)}
            offsetY={'366px'}
            direction={'center-up'}
            shouldShowTooltip={() => (
              (this.state.distanceFlown === 0 || this.state.gameover === true) &&
              !this.props.nextEnabled && (
                (this.props.step === 0) ||
                (this.props.step === 1 && this.props.pipesFeatureEnabled) ||
                (this.props.step === 2 && this.props.gravity !== 9.8) ||
                (this.props.step === 3 && this.props.id === 'B' && this.props.playedLevel !== 3)
              )
            )}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139 262">
            <g>
              <rect fill="#212222" width="139" height="262" rx="12" ry="12"/>
              <rect fill="#606161" x="52.5" y="7" width="34" height="5" rx="2.5" ry="2.5"/>
              <rect fill="#606161" x="52.5" y="250" width="34" height="5" rx="2.5" ry="2.5"/>
              <circle fill="#000EFF" cx="26.08" cy="12" r="3.42"/>
              <circle fill="#000EFF" cx="41" cy="12" r="3.42"/>
              <circle fill="#000000" cx="92.91" cy="12" r="2.42"/>
            </g>
          </svg>
        </div>
        { this.props.showBadge && (
          <div style={styles.badge} className="flex--dead-center">{this.props.id}</div>
        )}
        <div style={styles.gameContainer}>
          {
            gameover ? (
              <div>
                <div className="score-panel">
                  <div className="score">
                    {this.state.score}
                  </div>
                  <div className="best-score">
                    {this.state.bestScore}
                  </div>
                </div>
                <div className="gameover-modal">
                  <div style={styles.buttonContainer}>
                    <div className="restart-button" onClick={this.restart}></div>
                  </div>
                </div>
              </div>
            ) : null
          }
          <canvas id={this.props.id} className="game-content" width="288" height="512" onClick={this.start}></canvas>
          { !this.state.introScreen && !gameover && <div className="score-label">Score</div> }
        </div>
      </div>
    );
  }
}

const styles = {
  gameContainer: {
    width: '288px',
    height: '512px',
    display: 'block',
    position: 'relative',
    border: '1px solid #ccc',
    overflow: 'hidden',
    margin: '45px 15px',
  },
  badge: {
    backgroundColor: '#514FFF',
    borderRadius: '20px',
    color: 'white',
    width: '25px',
    height: '25px',
    display: 'flex',
    marginRight: '10px',
    fontWeight: '800',
    position: 'absolute',
    zIndex: 5,
  },
  phoneBackground: {
    position: 'absolute',
    width: '320px',
  },
  appContainer: {
    padding: '20px',
  },
  buttonContainer: {
    marginTop: '100px',
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

const mapStateToProps = (state , props) => {
  return {
    showBadge: state.controlSets > 1,
    step: state.step,
    playedLevel: state.playedLevel,
    nextEnabled: state.nextEnabled,
    ...props
  }
}

const mapDispatchToProps = { playedGame, nextStep, enableNext }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
