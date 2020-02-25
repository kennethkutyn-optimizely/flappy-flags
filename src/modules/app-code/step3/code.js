export const code = `
import optimizely
optly = optimizely.createInstance({ sdkKey: 'GjuE6ZMHR8ufwfkCjuXa6' })

startFlappyBird({
  pipes: optly.isFeatureEnabled('pipes'),
  gravity: 9.8,
})
`;
