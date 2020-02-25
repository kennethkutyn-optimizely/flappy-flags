import store from './store';
import { actionTypes } from './constants';

export const increment = function() {
  return { type: 'INCREMENT' }
}

export const decrement = function() {
  return { type: 'DECREMENT' }
}

export const toggleFeature = function({ variationKey, featureKey, enabled }) {
  return {
    type: actionTypes.TOGGLE_FEATURE,
    variationKey,
    featureKey,
    enabled,
  }
}

export const setVariable = function({ variationKey, variableKey, variableValue}) {
  return {
    type: actionTypes.SET_VARIABLE,
    variationKey,
    variableKey,
    variableValue,
  }
}

export const startExperiment = function() {
  return {
    type: actionTypes.START_EXPERIMENT,
  }
}

export const toggleCode = function() {
  return {
    type: actionTypes.TOGGLE_CODE,
  }
}

export const playedGame = function({ level }) {
  return {
    type: actionTypes.PLAYED_GAME,
    level,
  }
}

export const previousStep = function() {
  return {
    type: actionTypes.PREVIOUS_STEP,
  }
}

export const nextStep = function() {
  return {
    type: actionTypes.NEXT_STEP,
  }
}

export const enableNext = function() {
  return {
    type: actionTypes.ENABLE_NEXT,
  }
}

export const addControlSet = function() {
  return {
    type: actionTypes.ADD_CONTROLS,
  }
}

export const removeControlSet = function() {
  return {
    type: actionTypes.REMOVE_CONTROLS,
  }
}

export const enableFeatureControls = function() {
  return {
    type: actionTypes.ENABLE_FEATURE_CONTROLS,
  }
}

export const enableVariableControls = function() {
  return {
    type: actionTypes.ENABLE_VARIABLE_CONTROLS,
  }
}

export const reset = function() {
  return {
    type: actionTypes.RESET,
  }
}

export const viewDocs = function() {
  return {
    type: actionTypes.VIEW_DOCS,
  }
}

export const createAccount = function() {
  return {
    type: actionTypes.CREATE_ACCOUNT,
  }
}

export const increaseCodeRevision = function() {
  return {
    type: actionTypes.INCREASE_CODE_REVISION,
  }
}

export const saveCode = function() {
  return {
    type: actionTypes.SAVE_CODE,
  }
}
