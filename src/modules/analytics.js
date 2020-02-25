import { actionTypes } from '../redux/constants';

const events = {
  STEP1_WELCOME_VIEWED: 'FS FlappyBird Demo Step1 Welcome Viewed',
  STEP2_ADD_A_FEATURE_VIEWED: 'FS FlappyBird Demo Step2 Add a Feature Viewed',
  STEP3_CONFIGURE_VARIABLES_VIEWED: 'FS FlappyBird Demo Step3 Configure Variables Viewed',
  STEP4_SETUP_EXPERIMENT_VIEWED: 'FS FlappyBird Demo Step4 Setup Experiment Viewed',
  STEP5_RUN_EXPERIMENT_VIEWED: 'FS FlappyBird Demo Step5 Run Experiment Viewed',
  STEP6_ANALYZE_RESULTS_VIEWED: 'FS FlappyBird Demo Step6 Analyze Results Viewed',
  STEP7_CONGRATS_VIEWED: 'FS FlappyBird Demo Step7 Congrats Viewed',
  FEATURE_TOGGLED: 'FS FlappyBird Demo Feature Toggled',
  SET_VARIABLE: 'FS FlappyBird Demo Set Variable',
  VARIATION_ADDED: 'FS FlappyBird Demo Variation Added',
  VARIATION_SWITCHED: 'FS FlappyBird Demo Variation Switched',
  EXPERIMENT_RAN: 'FS FlappyBird Demo Experiment Ran',
  WINNER_LAUNCHED: 'FS FlappyBird Demo Winner Launched',
  SEE_DOCS: 'FS FlappyBird Demo See Docs Clicked',
  CREATE_ACCOUNT: 'FS FlappyBird Demo Create Account Clicked',
  DEMO_RESET: 'FS FlappyBird Demo Demo Reset',
  PLAYED_GAME: 'FS FlappyBird Demo Played Game',
}

const eventMap = {
  [actionTypes.TOGGLE_FEATURE]: events.FEATURE_TOGGLED,
  [actionTypes.SET_VARIABLE]: events.SET_VARIABLE,
  [actionTypes.ADD_CONTROLS]: events.VARIATION_ADDED,
  [actionTypes.START_EXPERIMENT]: events.EXPERIMENT_RAN,
  [actionTypes.PLAYED_GAME]: events.PLAYED_GAME,
  [actionTypes.VIEW_DOCS]: events.SEE_DOCS,
  [actionTypes.CREATE_ACCOUNT]: events.CREATE_ACCOUNT,
  [actionTypes.RESET]: events.DEMO_RESET,
}

function mapActionToEvent(store, action) {
  let noEvent = { event: undefined }

  switch (action.type) {
    case actionTypes.INIT:
      break;
    case actionTypes.NEXT_STEP:
      let stepsMap = [
        events.STEP1_WELCOME_VIEWED,
        events.STEP2_ADD_A_FEATURE_VIEWED,
        events.STEP3_CONFIGURE_VARIABLES_VIEWED,
        events.STEP4_SETUP_EXPERIMENT_VIEWED,
        events.STEP5_RUN_EXPERIMENT_VIEWED,
        events.STEP6_ANALYZE_RESULTS_VIEWED,
        events.STEP7_CONGRATS_VIEWED,
      ]

      return {
        event: stepsMap[store.getState().step]
      }
      break;
    // All the below events are just mapped directly
    case actionTypes.TOGGLE_FEATURE:
    case actionTypes.SET_VARIABLE:
    case actionTypes.ADD_CONTROLS:
    case actionTypes.START_EXPERIMENT:
    case actionTypes.PLAYED_GAME:
    case actionTypes.VIEW_DOCS:
    case actionTypes.CREATE_ACCOUNT:
    case actionTypes.RESET:
      return {
        event: eventMap[action.type],
      }
      break;
    default:
      return noEvent
      break;
  }

  return noEvent;
}

function logAnalyticsEvent(store, action) {
  try {
    const { event, payload } = mapActionToEvent(store, action);
    if (event) {
      window.analytics.track(event, payload);
      //console.log('Logging event', event, payload);
    }
  } catch (error) {
    console.warn(`Failed to track event to analytics: ${error}`);
  }
}

export const logger = store => next => action => {
  let result = next(action)
  logAnalyticsEvent(store, action);
  return result
}
