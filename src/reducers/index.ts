import { combineReducers } from 'redux'
import defaultReducer from './defaultReducer'
import librairieReducer from './librairieReducer'
import sondageReducer from './sondageReducer'

export default combineReducers({
  root:defaultReducer,
  librarie:librairieReducer,
  sondage:sondageReducer
})