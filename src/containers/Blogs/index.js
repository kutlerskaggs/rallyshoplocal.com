import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import BlogsView from 'views/Blogs'
// utils
import { forOwn, sortBy } from 'lodash'

export class Blogs extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { blogs: [], moreAvailable: true, posts: [] }
    this.concatPosts = this.concatPosts.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
    this.checkIfMorePostsAvailable = this.checkIfMorePostsAvailable.bind(this)
  }

  componentWillMount () {
    let { blogSlug } = this.props.params
    let nextState = this.concatPosts(blogSlug)
    let moreAvailable = this.checkIfMorePostsAvailable(blogSlug)
    if (nextState.posts.length < 6 && moreAvailable) {
      this.loadPosts(blogSlug)
    }
  }

  componentWillReceiveProps (nextProps) {
    let { blogSlug } = this.props.params
    let { blogSlug: nextBlogSlug } = nextProps.params
    // if !blogSlug componentWillMount will be called
    if (blogSlug && blogSlug !== nextBlogSlug) {
      let nextState = this.concatPosts(nextBlogSlug)
      let moreAvailable = this.checkIfMorePostsAvailable(nextBlogSlug)
      if (nextState.posts.length < 6 && moreAvailable) {
        this.loadPosts(nextBlogSlug)
      }
    }
  }

  checkIfMorePostsAvailable (blogSlug) {
    let moreAvailable
    let { byType } = this.props.blog
    if (blogSlug) {
      let { attributes, posts } = byType.blogs[blogSlug]
      moreAvailable = posts.length < attributes.post_count
    } else {
      let { _fetched, _post_count } = byType.blogs
      moreAvailable = _fetched < _post_count
    }
    this.setState({ moreAvailable })
    return moreAvailable
  }

  concatPosts (blogSlug) {
    let state = { blogs: [], posts: [] }
    this.checkIfMorePostsAvailable(blogSlug)
    forOwn(this.props.blog.byType.blogs, (category) => {
      // ignore props
      if (category.posts) {
        state.blogs.push(category.attributes)
        if (!blogSlug || category.attributes.slug === blogSlug) {
          state.posts = state.posts.concat(category.posts)
        }
      }
    })
    state.posts = sortBy(state.posts, 'date').reverse()
    this.setState(state)
    return state
  }

  loadPosts (blogSlug) {
    let { getPosts } = this.props
    getPosts('blogs', blogSlug).then(() => this.concatPosts(blogSlug))
  }

  render () {
    let { blogs, moreAvailable, posts } = this.state
    let { blogSlug } = this.props.params
    let loadPosts = () => this.loadPosts(blogSlug)

    return this.props.children ||
      <BlogsView
        activeBlog={blogSlug}
        blogs={blogs}
        posts={posts}
        loadMore={loadPosts}
        moreAvailable={moreAvailable} />
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blogs)
