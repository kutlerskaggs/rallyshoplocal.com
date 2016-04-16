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
    this.state = { blogs: [], posts: [] }
    this.concatPosts = this.concatPosts.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
  }

  componentWillMount () {
    let { blogSlug } = this.props.params
    let nextState = this.concatPosts(blogSlug)
    if (nextState.posts.length < 6) {
      this.loadPosts()
    }
  }

  componentWillReceiveProps (nextProps) {
    let { blogSlug } = this.props.params
    let { blogSlug: nextBlogSlug } = nextProps.params
    if (blogSlug !== nextBlogSlug) {
      let nextState = this.concatPosts(nextBlogSlug)
      if (nextState.posts.length < 6) {
        this.loadPosts(nextBlogSlug)
      }
    }
  }

  concatPosts (blogSlug) {
    let state = { blogs: [], posts: [] }
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
    let { getPosts, params } = this.props
    blogSlug = blogSlug || params.blogSlug
    getPosts('blogs', blogSlug).then(() => this.concatPosts(blogSlug))
  }

  render () {
    let { blogs, posts } = this.state
    let { blog: { byType }, params: { blogSlug } } = this.props
    let moreAvailable
    if (blogSlug) {
      let { attributes, posts } = byType.blogs[blogSlug]
      moreAvailable = posts.length < attributes.post_count
    } else {
      let { _fetched, _post_count } = this.props.blog.byType.blogs
      moreAvailable = _fetched < _post_count
    }

    return this.props.children ||
      <BlogsView blogs={blogs} posts={posts} loadMore={this.loadPosts} moreAvailable={moreAvailable} />
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blogs)
