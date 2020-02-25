import { code as code1 } from './step1/code'
import { code as code2 } from './step2/code'
import { code as code3 } from './step3/code'
import { code as code4 } from './step4/code'

export function getAppCode(step, data) {
const appCodes = [
`// Step1: Import the Optimizely SDK


// Step2: Connect the SDK to the UI





game.start({
  // Step3: Add a Feature Flag
  pipes: false,

  // Step4: Add a Feature Variable
  gravity: 9.8,
})

game.on('played_game', () => {
  // Step5: Track events
  
})`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI





game.start({
  // Step3: Add a Feature Flag
  pipes: false,

  // Step4: Add a Feature Variable
  gravity: 9.8,
})

game.on('played_game', () => {
  // Step5: Track events
  
})
`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI
optly = optimizely.createInstance({
  sdkKey: 'GjuE6ZMHR8ufwfkCjuXa6'
})


game.start({
  // Step3: Add a Feature Flag
  pipes: false,

  // Step4: Add a Feature Variable
  gravity: 9.8,
})

game.on('played_game', () => {
  // Step5: Track events
  
})
`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI
optly = optimizely.createInstance({
  sdkKey: '8k4bZ37'
})


game.start({
  // Step3: Add a Feature Flag
  pipes: optly.isFeatureEnabled('pipes'), // ${data.isEnabledA}

  // Step4: Add a Feature Variable
  gravity: 9.8,
})

game.on('played_game', () => {
  // Step5: Track events
  
})
`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI
optly = optimizely.createInstance({
  sdkKey: '8k4bZ37'
})


game.start({
  // Step3: Add a Feature Flag
  pipes: optly.isFeatureEnabled('pipes'), // ${data.isEnabledA}

  // Step4: Add a Feature Variable
  gravity: optly.getFeatureVariable('gravity'), // ${data.gravityA}
})

game.on('played_game', () => {
  // Step5: Track events
  
})
`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI
optly = optimizely.createInstance({
  sdkKey: '8k4bZ37'
})


game.start({
  // Step3: Add a Feature Flag
  pipes: optly.isFeatureEnabled('pipes'), // ${data.isEnabledA}

  // Step4: Add a Feature Variable
  gravity: optly.getFeatureVariable('gravity'), // ${data.gravityA}
})

game.on('played_game', () => {
  // Step5: Track events
  optly.track('played_game');
})
`,
`// Step1: Import the Optimizely SDK
import optimizely from '@optimizely/optimizely-sdk'

// Step2: Connect the SDK to the UI
optly = optimizely.createInstance({
  sdkKey: '8k4bZ37'
})

userId = 'user123'
game.start({
  // Step3: Add a Feature Flag - ${data.isEnabledA} or ${data.isEnabledB}
  pipes: optly.isFeatureEnabled('pipes', userId),

  // Step4: Add a Feature Variable - ${data.gravityA} or ${data.gravityB}
  gravity: optly.getFeatureVariable('gravity', userId),
})

game.on('played_game', () => {
  // Step5: Track events
  optly.track('played_game', userId);
})
`
];
  return appCodes[step]
}
