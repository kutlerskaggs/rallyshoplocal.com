import { forOwn } from 'lodash'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const ERROR_FETCHING_POSTS = 'ERROR_FETCHING_POSTS'

// let apiKey = 'AIzaSyA3zd8Vp7IDsWvkepT0h0fNKBkCFku58j0'
let blogs = ['thomas-foolery', 'horse-trough-time-machine', 'connie-lingus', 'blog'] // TODO remove 'Blog'
let podcasts = ['cinema-danger-duo', 'no-label-round-table']
let urlBase = 'https://public-api.wordpress.com/rest/v1.1/sites/rallycasper.com'

// called once on app startup
export const getCategories = (dispatch) => {
  let url = `${urlBase}/categories`
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json().then((json) => {
        let _categories = { blogs: {}, podcasts: {} }
        json.categories.forEach((category) => {
          let validBlog = blogs.some((_blog) => _blog === category.slug)
          if (validBlog) {
            _categories.blogs[category.slug] = { attributes: category, posts: [] }
          } else {
            let validPodcast = podcasts.some((_podcast) => _podcast === category.slug)
            if (validPodcast) {
              _categories.podcasts[category.slug] = { attributes: category, posts: [] }
            }
          }
        })
        dispatch(receiveCategories(_categories))
      })
    }
  })
}

export const getPost = (blogId, postId) => {

}

export const getPosts = (params) => {
  return (dispatch, getState) => {
    let url = `${urlBase}/posts?number=7`

    dispatch(requestPosts())
    // TODO only fetch if necessary
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((json) => {
          let posts = { blogs: {}, podcasts: {} }
          json.posts.forEach((post) => {
            let found = false

            forOwn(post.categories, (category) => {
              if (!found) {
                let blog = blogs.find((blog) => blog === category.slug)
                if (blog) {
                  posts.blogs[blog] = posts.blogs[blog] ? posts.blogs[blog] : []
                  posts.blogs[blog].push(post)
                  found = true
                }
                // TODO make this better
                let podcast = podcasts.find((podcast) => podcast === category.slug)
                if (!found && podcast) {
                  posts.podcasts[podcast] = posts.podcasts[podcast] ? posts.podcasts[podcast] : []
                  posts.podcasts[podcast].push(post)
                  found = true
                }
              }

              // return false
            })
          })
          dispatch(receivePosts(posts))
        })
      }
      // something bad happened
      dispatch(errorFetchingPosts())
    })
  }
}

export const errorFetchingPosts = () => ({ type: ERROR_FETCHING_POSTS })
export const receivePosts = (posts) => ({ type: RECEIVE_POSTS, posts })
export const receiveCategories = (categories) => ({ type: RECEIVE_CATEGORIES, categories })
export const requestPosts = () => ({ type: REQUEST_POSTS })
