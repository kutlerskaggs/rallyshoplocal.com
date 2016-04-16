import { forOwn, sortBy, uniqBy } from 'lodash'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  REQUEST_POSTS,
  UPDATE_PAGING,
  ERROR_FETCHING_POSTS
} from 'redux/modules/actions/blog'

let defaultState = {
  loading: false,
  byType: { blogs: {}, podcasts: {} },
  paging: { blogs: {}, podcasts: {} }
}

export function blog (state = defaultState, action) {
  const { type } = action
  let nextState = Object.assign({}, state)

  switch (type) {
    case RECEIVE_POSTS: {
      // TODO add paging
      // console.log(action.posts)
      ['blogs', 'podcasts'].forEach((type) => {
        let currentCategory = nextState.byType[type]
        forOwn(action.posts[type], (posts, slug) => {
          let currentPosts = currentCategory[slug].posts
          // TODO maintain uniqueness and sorting
          // TODO maintain uniqueness and sorting
          // TODO maintain uniqueness and sorting
          currentPosts = currentPosts.concat(posts)
          currentPosts = uniqBy(currentPosts, (post) => post.ID)
          nextState.byType[type][slug].posts = sortBy(currentPosts, 'date').reverse()
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
      let { paging } = action
      let { blogs, podcasts } = nextState.paging
      nextState.paging.blogs = Object.assign(blogs, paging.blogs)
      nextState.paging.podcasts = Object.assign(podcasts, paging.podcasts)
      if (paging.nextPage) {
        nextState.paging.nextPage = paging.nextPage
      }
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
