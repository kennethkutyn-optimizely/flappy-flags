import React, { Component } from 'react';

function Tooltip(props) {

  const offsetX = props.offsetX || '0px';
  const offsetY = props.offsetY || '0px';
  const direction = props.direction
  const className = direction === 'up' || direction === 'down' || direction === 'center-up'
    ? "fader bouncer"
    : "fader jiggler"

  return (
    <div style={styles.tooltipContainer}>
      { props.shouldShowTooltip() && (
        <div className={className} style={{position:'absolute', left: offsetX, top: offsetY }}>
          { props.direction === 'left' && (<div className="arrow-left" style={styles.left}></div>) }
          { props.direction === 'right' && (<div className="arrow-right" style={styles.right}></div>) }
          { props.direction === 'up' && (<div className="arrow-up" style={styles.up}></div>) }
          { props.direction === 'center-up' && (<div className="arrow-up" style={styles.centerUp}></div>) }
          { props.direction === 'down' && (<div className="arrow-down" style={styles.down}></div>) }
          <div style={styles.tooltip}>
            <div>{ props.text }</div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  tooltipContainer: {
    zIndex: 20,
    position: 'absolute',
    width: '340px',
    height: '0px',
  },
  left: {
    position: 'absolute',
    marginTop: '10px',
    marginLeft: '-7px',
  },
  right: {
    position: 'absolute',
    marginTop: '10px',
    left: '99%',
  },
  centerUp: {
    top: '-7px',
    left: '45%',
    position: 'absolute',
  },
  up: {
    top: '-6px',
    left: '80%',
    position: 'absolute',
  },
  down: {
    top: '99%',
    left: '80%',
    position: 'absolute',
  },
  tooltip: {
    boxShadow: '0px 2px 5px rgba(0,0,0,0.15)',
    border: '1px solid #0037FF',
    backgroundColor: '#FFFFFF',
    textColor: '#0037FF',
    padding: '5px 10px 5px 10px',
    borderRadius: '5px',
    color: '#0037FF',
  }
}

export default Tooltip
