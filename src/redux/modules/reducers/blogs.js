import {
  RECEIVE_BLOG_POSTS,
  REQUEST_BLOG_POSTS,
  ERROR_FETCHING_BLOGS
} from 'redux/modules/actions/blogs'

let defaultState = {
  loading: false,
  byId: {}
}

export function blogs (state = defaultState, action) {
  const { type, blogs } = action
  let nextState = Object.assign({}, state)

  switch (type) {
    case RECEIVE_BLOG_POSTS: {
      blogs.forEach((blog) => {
        let { id, nextPageToken, posts } = blog
        let currentState = nextState.byId[id]
        currentState = {
          nextPageToken: nextPageToken,
          posts: currentState ? currentState.posts.concat(posts) : posts // TODO check for duplicates
        }
        nextState.byId[id] = currentState
      })
      nextState.loading = false
      return nextState
    }
    case REQUEST_BLOG_POSTS: {
      nextState.loading = true
      return nextState
    }
    case ERROR_FETCHING_BLOGS: {
      // TODO display error message
      nextState.loading = false
      return nextState
    }
    default: {
      return state
    }
  }
}
