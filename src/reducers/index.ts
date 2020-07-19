import { combineReducers } from 'redux'
import defaultReducer from './defaultReducer'
import librairieReducer from './librairieReducer'

export default combineReducers({
  root:defaultReducer,
  librarie:librairieReducer
})