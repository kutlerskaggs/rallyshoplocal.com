import { forOwn } from 'lodash'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const UPDATE_PAGING = 'UPDATE_PAGING'
export const ERROR_FETCHING_POSTS = 'ERROR_FETCHING_POSTS'

let types = {
  blogs: ['thomas-foolery', 'horse-trough-time-machine', 'connie-lingus'],
  podcasts: ['cinema-danger-duo', 'no-label-roundtable']
}
let urlBase = 'https://public-api.wordpress.com/rest/v1.1/sites/rallyshoplocal.wordpress.com'

// called once on app startup
export const getCategories = () => {
  return (dispatch) => {
    let url = `${urlBase}/categories`
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((json) => {
          let _categories = {
            blogs: { _post_count: 0 },
            podcasts: { _post_count: 0 }
          }
          let { blogs, podcasts } = types
          json.categories.forEach((category) => {
            let validBlog = blogs.some((_blog) => _blog === category.slug)
            if (validBlog) {
              _categories.blogs._post_count += category.post_count
              _categories.blogs[category.slug] = { attributes: category, posts: [] }
            } else {
              let validPodcast = podcasts.some((_podcast) => _podcast === category.slug)
              if (validPodcast) {
                _categories.podcasts._post_count += category.post_count
                _categories.podcasts[category.slug] = { attributes: category, posts: [] }
              }
            }
          })
          dispatch(receiveCategories(_categories))
        })
      }
    })
  }
}

export const getPost = (postSlug) => {
  return (dispatch) => {
    let url = `${urlBase}/posts/slug:${postSlug}`
    dispatch(requestPosts())
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((post) => {
          _categorizePost(post)
          let posts = { [`${post._type}s`]: { [post._category]: [post] } }
          dispatch(receivePosts(posts))
        })
      }
    })
  }
}

export const getPosts = (type, category) => {
  return (dispatch, getState) => {
    let state = getState().posts
    let { byType } = state
    let categoryParam = ''
    let offsetParam = ''
    // maybe overridden below ( if > 0 we already have home page posts )
    let shouldGetPosts = !(byType.blogs._fetched + byType.podcasts._fetched)

    if (type) {
      // category param
      categoryParam += `&category=${category
        ? `${category}`
        : `${types[type].join(',')}`}`

      // offset param
      let offset
      if (category) {
        let { attributes, posts } = byType[type][category]
        offset = posts.length < attributes.post_count ? posts.length : undefined
      } else {
        let { _fetched, _post_count } = byType[type]
        offset = _fetched < _post_count || !_post_count ? _fetched : undefined
      }
      shouldGetPosts = offset !== undefined
      offsetParam = offset ? `&offset=${offset}` : ''
    }

    let url = `${urlBase}/posts?number=6${categoryParam}${offsetParam}`

    if (shouldGetPosts) {
      dispatch(requestPosts())

      return fetch(url).then((res) => {
        if (res.ok) {
          return res.json().then((json) => {
            let posts = { blogs: {}, podcasts: {} }
            json.posts.forEach((post) => {
              _categorizePost(post)
              if (post._type === 'blog') {
                let blog = post._category
                posts.blogs[blog] = posts.blogs[blog] ? posts.blogs[blog] : []
                posts.blogs[blog].push(post)
              } else if (post._type === 'podcast') {
                let podcast = post._category
                posts.podcasts[podcast] = posts.podcasts[podcast] ? posts.podcasts[podcast] : []
                posts.podcasts[podcast].push(post)
              }
            })

            // update fetched count for blogs || podcasts
            if (type && !category) {
              let _fetched = state.byType[type]._fetched + json.posts.length
              dispatch(updatePaging({ type, _fetched }))
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
export const updatePaging = (payload) => ({ type: UPDATE_PAGING, payload })

function _categorizePost (post) {
  forOwn(post.categories, (category) => {
    let found = false
    let { blogs, podcasts } = types
    if (!found) {
      let blog = blogs.find((blog) => blog === category.slug)
      if (blog) {
        post._type = 'blog'
        post._category = blog
        found = true
      }
      // TODO make this better
      let podcast = podcasts.find((podcast) => podcast === category.slug)
      if (!found && podcast) {
        post._type = 'podcast'
        post._category = podcast
        found = true
      }
    }
  })
}
