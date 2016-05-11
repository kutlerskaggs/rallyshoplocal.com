import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { creatives } from 'redux/modules/reducers/creatives'
import { magazines } from 'redux/modules/reducers/magazines'
import { posts } from 'redux/modules/reducers/posts'

export default combineReducers({
  creatives,
  magazines,
  posts,
  router
})
