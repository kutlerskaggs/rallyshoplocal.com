import { forOwn } from 'lodash'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  ERROR_FETCHING_POSTS
} from 'redux/modules/actions/blogs'

let defaultState = {
  loading: false,
  byCategory: { blogs: {}, podcasts: {} }
}

export function blogs (state = defaultState, action) {
  const { type } = action
  let nextState = Object.assign({}, state)

  switch (type) {
    case RECEIVE_POSTS: {
      // TODO add paging
      // console.log(action.posts)
      ['blogs', 'podcasts'].forEach((type) => {
        let currentCategory = nextState.byCategory[type]
        forOwn(action.posts[type], (posts, slug) => {
          let currentPosts = currentCategory[slug].posts
          nextState.byCategory[type][slug].posts = currentPosts.concat(posts) // TODO check for duplicates
        })
      })
      nextState.loading = false
      return nextState
    }
    case RECEIVE_CATEGORIES: {
      nextState.byCategory = action.categories
      return nextState
    }
    case REQUEST_POSTS: {
      nextState.loading = true
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
