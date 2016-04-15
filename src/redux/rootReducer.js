import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { blog } from 'redux/modules/reducers/blog'

export default combineReducers({
  blog,
  router
})
