import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { blogs } from 'redux/modules/reducers/blogs'

export default combineReducers({
  blogs,
  router
})
