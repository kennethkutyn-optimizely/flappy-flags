export const INITIAL_STATE = {
  pipesFeatureEnabledA: false,
  gapA: 120,
  gravityA: 9.8,

  pipesFeatureEnabledB: true,
  gapB: 120,
  gravityB: 10,

  step: 0,
  controlSets: 1,
  playedLevel: -1,
  nextEnabled: false,

  /*
  step: 7,
  controlSets: 1, // Must reduce control sets down
  playedLevel: 3,
  nextEnabled: true, // Must enable next
  codeRevision: 1,
  */
}

export const STEP_DEFAULTS = [
  {},
  {},
  {},
  {
    controlSets: 1,
  },
  {
    controlSets: 2,
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
]

export const events = {
  STEP1_WELCOME_VIEWED: 'FS FlappyBird Demo Step1 Welcome Viewed',
  STEP2_ADD_A_FEATURE_VIEWED: 'FS FlappyBird Demo Step2 Add a Feature Viewed',
  STEP3_CONFIGURE_VARIABLES_VIEWED: 'FS FlappyBird Demo Step3 Configure Variables Viewed',
  STEP4_SETUP_EXPERIMENT_VIEWED: 'FS FlappyBird Demo Step4 Setup Experiment Viewed',
  STEP5_RUN_EXPERIMENT_VIEWED: 'FS FlappyBird Demo Step5 Run Experiment Viewed',
  STEP6_ANALYZE_RESULTS_VIEWED: 'FS FlappyBird Demo Step6 Analyze Results Viewed',
  STEP7_CONGRATS_VIEWED: 'FS FlappyBird Demo Step7 Congrats Viewed',
  FEATURE_TOGGLED: 'FS FlappyBird Demo Feature Toggled',
  SLIDER_CHANGED: 'FS FlappyBird Demo Slider Changed',
  VARIATION_ADDED: 'FS FlappyBird Demo Variation Added',
  VARIATION_SWITCHED: 'FS FlappyBird Demo Variation Switched',
  EXPERIMENT_RAN: 'FS FlappyBird Demo Experiment Ran',
  WINNER_LAUNCHED: 'FS FlappyBird Demo Winner Launched',
  SEE_DOCS: 'FS FlappyBird Demo See Docs Clicked',
  CREATE_ACCOUNT: 'FS FlappyBird Demo Create Account Clicked',
  DEMO_RESET: 'FS FlappyBird Demo Demo Reset',
}

export const STEP_INSTRUCTIONS = [
  {
    title: `Welcome`,
    text: `In this tutorial, you'll see what it's like to use Optimizely Full Stack to experiment on your application: FlappyBird. Before you make any changes, try playing your app. It's not very exciting, right?`,
  },
  {
    title: `Add a Feature`,
    text: `Your team already added a pipes feature to make the game more interesting. With Optimizely Full Stack, you can deploy that feature remotely. Try enabling the pipes feature and replaying the game.`,
  },
  {
    title: `Configure Variables`,
    text: `In addition to toggling features, you can also configure remote variables. Using Optimizely Full Stack, try increasing the gravity value for the game and replaying.`,
  },
  {
    title: `Setup an Experiment`,
    text: `Not sure what the best configuration is? With Optimizely Full Stack, you can create multiple different versions of your application to run a live A/B test on your users to see which configuration is best.`,
  },
  {
    title: `Run the Experiment`,
    text: `With different versions of your application, you can run a live experiment on real traffic to see which version of the app is more engaging.`,
  },
  {
    title: `Analyze the Results`,
    text: `As an experimentation platform, Optimizely provides statistical significance for the metrics that you care about the most. Launch the winning variation.`,
  },
  {
    title: `Congrats`,
    text: `You removed the digital guesswork from product development and now understand the basics of Optimizely Full Stack. Time to create an account and use it for real.`,
  },
  {
    title: `See the code`,
    text: `Let's take a look at what it takes to install Optimizely by first looking at our FlappyBird code to the right. Notice how the pipes and gravity settings are controlled in code, then see how to install Optimizely to control them.`,
  },
  {
    title: `Import the SDK`,
    text: `The first step to install Optimizely is importing the Optimizely SDK in your codebase.`,
  },
  {
    title: `Connect the SDK`,
    text: `The next step is to connect the SDK to your Optimizely UI via an SDK key. Optimizely uses the SDK key to download all the feature flag and variable data in the form of a JSON datafile from Optimizely's CDN so the SDK operates quickly in-memory.`,
  },
  {
    title: `Add a Feature Flag`,
    text: `Once the SDK is connected to the UI, you can then add a feature flag using the 'isFeatureEnabled' method and the name of your feature. Toggle the feature and see the value change in the comment.`,
  },
  {
    title: `Add a Feature Variable`,
    text: `You can also use the 'getFeatureVariable' method to get the value of variables defined in Optimizely. Change the variable and see the value change in the comment.`,
  },
  {
    title: `Track Events`,
    text: `Using the 'track' method of the Optimizely SDK, you can track events you care about. With integrations, you can also send Optimizely event data to analytics platforms you already use.`,
  },
  {
    title: `Experiment on Users`,
    text: `By passing in an identifier for the user, Optimizely can bucket different users into different variations in order to run an experiment. Bucketing is done deterministically and in-memory with hashing so it's fast and consistent.`
  },
  {
    title: `Control the Experience`,
    text: `Now that you have installed Optimizely, you can control the experience without any additional changes to the code.`
  },
  {
    title: `Congrats`,
    text: `You now understand how to install Optimizely into your codebase. If you still want to learn more, checkout our documentation and FAQ.`
  },
]
