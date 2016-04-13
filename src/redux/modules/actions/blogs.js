export const RECEIVE_BLOG_POSTS = 'RECEIVE_BLOG_POSTS'
export const REQUEST_BLOG_POSTS = 'REQUEST_BLOG_POSTS'
export const ERROR_FETCHING_BLOGS = 'ERROR_FETCHING_BLOGS'

export const getBlogPosts = (blogIds, apiKey) => {
  blogIds = Array.isArray(blogIds) ? blogIds : [blogIds]

  return (dispatch, getState) => {
    dispatch(requestBlogPosts())

    // fetch blogs
    let promises = []
    let { blogs: currentState } = getState()
    blogIds.forEach((blogId) => {
      let { nextPageToken, posts } = currentState.byId[blogId] || {}
      // only fetch posts if necessary
      if (nextPageToken || !posts) {
        let urlBase = 'https://www.googleapis.com/blogger/v3/blogs'
        let pageQuery = nextPageToken ? `&pageToken=${nextPageToken}` : ''
        let url = `${urlBase}/${blogId}/posts?key=${apiKey}&maxResults=6${pageQuery}`
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
  }
}

export const errorFetchingBlogs = () => ({ type: ERROR_FETCHING_BLOGS })
export const receiveBlogPosts = (blogs) => ({ type: RECEIVE_BLOG_POSTS, blogs })
export const requestBlogPosts = () => ({ type: REQUEST_BLOG_POSTS })
