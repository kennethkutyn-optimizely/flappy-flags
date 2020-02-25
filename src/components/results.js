import React from 'react';
import moment from 'moment';
import { Button, } from 'optimizely-oui';
import { connect } from 'react-redux'
import { nextStep } from '../redux/actions'
import Tooltip from './tooltip'
import { Table, } from 'optimizely-oui';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function formatLift(lift) {
  return lift > 0
    ? `+${lift}%`
    : `${lift}%`;
}

function getImprovement(pipes, gravity) {
  return pipes
    ? 15 - Math.abs(12 - gravity)
    : -35 + 24 - gravity
}

function getEngagement(improvement) {
  const baseEngagement = 2500;
  return Math.round(baseEngagement * (1 + improvement / 100) * 100) / 100;
}

function generateTimeData() {
  const data = [];
  for (let i=0; i<101; i++) {
    const time = (new Date()).getTime() + i*60*60*1000 * (5) // 5 hours
    data.push(time)
  }
  return data;
}

function generateData(timeData, trueImprovement) {

  function getArcTan(i) {
    return Math.atan((200 - i*4)/50 * 3/4)
  }

  const data = []
  for (let i=0; i<100; i++) {
    const maxBase = Math.abs(getArcTan(100))
    const baseCurve = ((getArcTan(100 - i) / maxBase) + 1) / 2 * trueImprovement;
    const randomDirection = Math.random() > 0.5 ? 1 : -1;
    const randomAdjustment = Math.random() * randomDirection * ((100 - i)/100) * trueImprovement / 3
    data.push([timeData[i], Math.floor(baseCurve + randomAdjustment)])
  }

  data.push([timeData[100], trueImprovement])

  return data
}

function Results(props) {

  // REAL RESULTS
  //let improvementA = getImprovement(props.pipesFeatureEnabledA, props.gravityA)
  //let improvementB = getImprovement(props.pipesFeatureEnabledB, props.gravityB)

  // FIXED RESULTS
  let improvementA = getImprovement(true, 24)
  let improvementB = getImprovement(true, 10)

  const variationAWinner = improvementA > improvementB

  const timeData = generateTimeData();
  const variationAData = generateData(timeData, improvementA);
  const variationBData = generateData(timeData, improvementB);

  const RED = '#e92063'
  const GREEN = '#74C6BF'

  const variationAColor = variationAWinner ? GREEN : RED;
  const variationBColor = variationAWinner ? RED : GREEN;

  function rolloutWinner() {
    props.nextStep();
  }

  const options = {
    chart: {
      type: 'line'
    },
    style: {
      fontFamily: 'ProximaNova-Regular, Proxima Nova',
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: 'Improvement'
      }
    },
    tooltip: {
      crosshairs: true,
      formatter() {
        const points = this.points.map(point => (
          `<div>
              <b style='color: ${point.series.color}'>
                ${point.series.name}:
              </b>
              ${formatLift(point.y)}
            </div>`
        ));
        return (
          `<div>
            <div>${moment(this.x).format('dddd, MMMM D, YYYY')}</div>
            ${points.join('')}
          </div>`
        );
      },
      shared: true,
      useHTML: true,
    },
    series: [{
      name: 'Variation A',
      color: variationAColor,
      data: variationAData,
    }, {
      name: 'Variation B',
      color: variationBColor,
      data: variationBData,
    }],
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
    },
    xAxis: {
      type: 'datetime',
    },
  }

  const tooltip = (
    <Tooltip
      offsetX={'-61px'}
      offsetY={'7px'}
      direction={'up'}
      text={'Launch winning variation'}
      shouldShowTooltip={() => (
        true
      )}
    />
  )

  return (
    <div style={styles.resultsContainer}>
      <Table
        density="loose"
        tableLayoutAlgorithm="fixed">
        <Table.THead>
          <Table.TR>
            <Table.TH>
              <h3>Results</h3>
            </Table.TH>
          </Table.TR>
          <Table.TR>
            <Table.TH>
              <h6 className="push--top">
                Variations
              </h6>
            </Table.TH>
            <Table.TH width="35%">
              <h6 className="push--top">
                Visitors
              </h6>
            </Table.TH>
            <Table.TH>
              <h6 className="push--top">
                Games Played
              </h6>
            </Table.TH>
            <Table.TH />
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          <Table.TR>
            <Table.TD>
              <h5>Variation A</h5>
            </Table.TD>
            <Table.TD>
              <div className="force-break">
                <h4>498</h4>
                <div className="micro">50.15%</div>
              </div>
            </Table.TD>
            <Table.TD>
              <h4>{ formatLift(improvementA) }</h4>
              <div className="micro"> { getEngagement(improvementA) } games</div>
            </Table.TD>
            <Table.TD>
              { variationAWinner && (
                <div>
                  <Button
                    type={"button"}
                    style={'highlight'}
                    onClick={rolloutWinner}>
                    Rollout Winner
                  </Button>
                  { tooltip }
                </div>
              )}
            </Table.TD>
          </Table.TR>
          <Table.TR>
            <Table.TD>
              <h5>Variation B</h5>
            </Table.TD>
            <Table.TD>
              <div className="force-break">
                <h4>495</h4>
                <div className="micro">49.84%</div>
              </div>
            </Table.TD>
            <Table.TD>
              <h4>{ formatLift(improvementB) }</h4>
              <div className="micro"> { getEngagement(improvementB) } games</div>
            </Table.TD>
            <Table.TD>
              { !variationAWinner && (
                <div>
                  <Button
                    type={"button"}
                    style={'highlight'}
                    onClick={rolloutWinner}>
                    Rollout Winner
                  </Button>
                  { tooltip }
                </div>
              )}
            </Table.TD>
          </Table.TR>
        </Table.TBody>
      </Table>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

const styles = {
  resultsContainer: {
    width: "650px",
  }
}

const mapStateToProps = (state , props) => {
  return {
    pipesFeatureEnabledA: state.pipesFeatureEnabledA,
    gravityA: state.gravityA,

    pipesFeatureEnabledB: state.pipesFeatureEnabledB,
    gravityB: state.gravityB,
    ...props
  }
}

const mapDispatchToProps = { nextStep }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
