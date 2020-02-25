import { INITIAL_STATE, STEP_DEFAULTS } from '../constants';
import { actionTypes } from './constants';

export default function reducer(state = { ...INITIAL_STATE }, action) {
  let newState;
  switch (action.type) {
    case actionTypes.ENABLE_FEATURE_CONTROLS:
      return { ...state, featureControlsEnabled: true }
    case actionTypes.ENABLE_VARIABLE_CONTROLS:
      return { ...state, variableControlsEnabled: true }
    case actionTypes.ADD_CONTROLS:
      return { ...state, controlSets: state.controlSets + 1 }
    case actionTypes.REMOVE_CONTROLS:
      return { ...state, controlSets: 1 }
    case actionTypes.NEXT_STEP:
      const nextEnabled = state.step > 6 && state.step < 14
      return { ...state, step: state.step + 1, nextEnabled: nextEnabled }
    case actionTypes.ENABLE_NEXT:
      return { ...state, nextEnabled: true }
    case actionTypes.PREVIOUS_STEP:
      const stepDefaults = STEP_DEFAULTS[state.step - 1]
      return { ...state, step: state.step - 1, nextEnabled: true, ...stepDefaults }
    case actionTypes.TOGGLE_FEATURE:
      newState = { ...state };
      newState[`${action.featureKey}${action.variationKey}`] = action.enabled;
      return newState;
    case actionTypes.INCREASE_CODE_REVISION:
      newState = { ...state, codeRevision: state.codeRevision + 1 };
      return newState;
    case actionTypes.SET_VARIABLE:
      newState = { ...state };
      newState[`${action.variableKey}${action.variationKey}`] = action.variableValue;
      return newState;
    case actionTypes.START_EXPERIMENT:
      return { ...state, experimenting: true }
    case actionTypes.TOGGLE_CODE:
      const codeVisible = !state.codeVisible
      return { ...state, codeVisible }
    case actionTypes.PLAYED_GAME:
      return { ...state, playedLevel: action.level }
    case actionTypes.RESET:
      return { ...INITIAL_STATE }
    default:
      return state
  }
}
