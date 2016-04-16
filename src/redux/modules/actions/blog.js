import { forOwn } from 'lodash'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const UPDATE_PAGING = 'UPDATE_PAGING'
export const ERROR_FETCHING_POSTS = 'ERROR_FETCHING_POSTS'

// let apiKey = 'AIzaSyA3zd8Vp7IDsWvkepT0h0fNKBkCFku58j0'
let types = {
  blogs: ['thomas-foolery', 'horse-trough-time-machine', 'connie-lingus', 'blog'], // TODO remove 'Blog'
  podcasts: ['cinema-danger-duo', 'no-label-round-table']
}
let urlBase = 'https://public-api.wordpress.com/rest/v1.1/sites/rallycasper.com'

// called once on app startup
export const getCategories = (dispatch) => {
  let url = `${urlBase}/categories`
  return fetch(url).then((res) => {
    if (res.ok) {
      return res.json().then((json) => {
        let _categories = { blogs: {}, podcasts: {} }
        let { blogs, podcasts } = types
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
  // TODO 
}

export const getPosts = (type, items) => {
  return (dispatch, getState) => {
    let state = getState().blog
    let categoryParam = ''

    // one or many blogs or podcasts
    if (type) {
      items = items || types[type]
      categoryParam += `&category=${Array.isArray(items)
        ? `${items.join('&category=')}`
        : `${items}`}`
    }
    // paging
    let { paging } = state
    let nextPage = type ? paging[type].nextPage : paging.nextPage
    let pagingParam = nextPage && nextPage !== 'end' ? `&page_handle=${nextPage}` : ''

    let url = `${urlBase}/posts?number=8${categoryParam}${pagingParam}`

    if (nextPage !== 'end') {
      dispatch(requestPosts())
      // TODO only fetch if necessary
      return fetch(url).then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            let posts = { blogs: {}, podcasts: {} }
            json.posts.forEach((post) => {
              let found = false

              forOwn(post.categories, (category) => {
                let { blogs, podcasts } = types
                if (!found) {
                  let blog = blogs.find((blog) => blog === category.slug)
                  if (blog) {
                    post._type = 'blog'
                    post._category = blog
                    posts.blogs[blog] = posts.blogs[blog] ? posts.blogs[blog] : []
                    posts.blogs[blog].push(post)
                    found = true
                  }
                  // TODO make this better
                  let podcast = podcasts.find((podcast) => podcast === category.slug)
                  if (!found && podcast) {
                    post._type = 'podcast'
                    post._category = podcast
                    posts.podcasts[podcast] = posts.podcasts[podcast] ? posts.podcasts[podcast] : []
                    posts.podcasts[podcast].push(post)
                    found = true
                  }
                }

                // return false
              })
            })

            // home page preview fetched
            if (!type) {
              dispatch(updatePaging({ nextPage: 'end' }))
            }
            dispatch(receivePosts(posts))
          })
        }
        // something bad happened
        dispatch(errorFetchingPosts())
      })
    }
    // no action needed
    return Promise.resolve()
  }
}

export const errorFetchingPosts = () => ({ type: ERROR_FETCHING_POSTS })
export const receivePosts = (posts) => ({ type: RECEIVE_POSTS, posts })
export const receiveCategories = (categories) => ({ type: RECEIVE_CATEGORIES, categories })
export const requestPosts = () => ({ type: REQUEST_POSTS })
export const updatePaging = (paging) => ({ type: UPDATE_PAGING, paging })
