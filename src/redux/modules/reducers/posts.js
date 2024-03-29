import { forOwn, sortBy, uniqBy } from 'lodash'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  UPDATE_PAGING,
  ERROR_FETCHING_POSTS
} from 'redux/modules/actions/posts'

let defaultState = {
  loading: false,
  byType: {
    blogs: {
      _fetched: 0,
      _post_count: 0
    },
    podcasts: {
      _fetched: 0,
      _post_count: 0
    }
  }
}
// default state set in main.js
export function posts (state = defaultState, action) {
  const { type } = action
  let nextState = Object.assign({}, state)

  switch (type) {
    case RECEIVE_POSTS: {
      ['blogs', 'podcasts'].forEach((type) => {
        let currentType = nextState.byType[type]
        forOwn(action.posts[type], (posts, category) => {
          // remove html encoding from title
          posts.forEach((post) => {
            let title = document.createElement('textarea')
            title.innerHTML = post.title
            post.title = title.value
          })

          let currentPosts = currentType[category].posts
          currentPosts = currentPosts.concat(posts)
          currentPosts = uniqBy(currentPosts, (post) => post.ID)
          nextState.byType[type][category].posts = sortBy(currentPosts, 'date').reverse()
        })
      })
      nextState.loading = false
      return nextState
    }
    case RECEIVE_CATEGORIES: {
      nextState.byType = action.categories
      return nextState
    }
    case REQUEST_POSTS: {
      nextState.loading = true
      return nextState
    }
    case UPDATE_PAGING: {
      let { type, _fetched } = action.payload
      nextState.byType[type]._fetched = _fetched
      return nextState
    }
    case ERROR_FETCHING_POSTS: {
      // TODO display error message
      nextState.loading = false
      return nextState
    }
    default: {
      return state
    }
  }
}
