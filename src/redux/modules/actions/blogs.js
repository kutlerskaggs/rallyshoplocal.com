export const RECEIVE_BLOGS = 'RECEIVE_BLOGS'
export const RECEIVE_BLOG_POSTS = 'RECEIVE_BLOG_POSTS'
export const REQUEST_BLOG_POSTS = 'REQUEST_BLOG_POSTS'
export const ERROR_FETCHING_BLOGS = 'ERROR_FETCHING_BLOGS'

let apiKey = 'AIzaSyA3zd8Vp7IDsWvkepT0h0fNKBkCFku58j0'
let blogs = ['2901360073818541851', '4269772225470041486', '6224536896252388655']
let podcasts = []
let urlBase = 'https://www.googleapis.com/blogger/v3/blogs'

// called once on app startup
export const getBlogs = (dispatch) => {
  let promises = []
  blogs.concat(podcasts).forEach((id) => {
    let url = `${urlBase}/${id}?key=${apiKey}`
    let promise = fetch(url).then((res) => {
      if (res.ok) {
        return res.json().then((json) => ({
          id,
          name: json.name,
          totalPosts: json.posts.totalItems
        }))
      }
      // TODO error handling
    })
    promises.push(promise)
  })
  return Promise.all(promises).then((results) => {
    dispatch(receiveBlogs(results))
  })
}

export const getBlogPost = (blogId, postId) => {
  
}

export const getBlogPosts = (blogIds) => {
  let _blogIds = blogIds ? Array.isArray(blogIds) ? blogIds : [blogIds] : blogs

  return (dispatch, getState) => {
    // fetch blogs
    let promises = []
    let { blogs: currentState } = getState()
    _blogIds.forEach((blogId) => {
      let { nextPageToken, posts, totalPosts } = currentState.byId[blogId] || {}
      // fetch if blog has no records in the store
      // or blogs were explicitly passed then page
      let shouldFetch = !posts.length || (blogIds && posts.length < totalPosts)

      // only fetch posts if necessary
      if (shouldFetch) {
        dispatch(requestBlogPosts())
        let pageQuery = nextPageToken ? `&pageToken=${nextPageToken}` : ''
        let url = `${urlBase}/${blogId}/posts?key=${apiKey}&maxResults=6${pageQuery}&view=READER`
        let promise = fetch(url).then((res) => {
          if (res.ok) {
            return res.json().then((json) => ({
              id: blogId,
              nextPageToken: json.nextPageToken,
              posts: json.items
            }))
          }
          // TODO improve error handling
          dispatch(errorFetchingBlogs())
          return { id: blogId, posts: [] }
        })
        promises.push(promise)
      }
    })

    // TODO add error checking
    // if any requests were made, pass results to store
    if (promises.length) {
      return Promise.all(promises).then((results) => dispatch(receiveBlogPosts(results)))
    }
    // no action required, resolve immediately
    return Promise.resolve()
  }
}

export const errorFetchingBlogs = () => ({ type: ERROR_FETCHING_BLOGS })
export const receiveBlogPosts = (blogs) => ({ type: RECEIVE_BLOG_POSTS, blogs })
export const receiveBlogs = (blogs) => ({ type: RECEIVE_BLOGS, blogs })
export const requestBlogPosts = () => ({ type: REQUEST_BLOG_POSTS })
