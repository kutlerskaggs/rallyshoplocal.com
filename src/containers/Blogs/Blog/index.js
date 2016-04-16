import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import BlogView from 'views/Blogs/Blog'
import Loader from 'components/Loader'

export class Blog extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { blog: undefined, requestedPosts: false }
  }

  componentWillMount () {
    if (!this.props.params.postSlug) {
      this.getPostsIfNeeded()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.params.postSlug && !this.state.requestedPosts) {
      this.getPostsIfNeeded()
    }
  }

  getPostsIfNeeded () {
    let { blog, getPosts, params: { blogSlug } } = this.props
    let _blog = blog.byType.blogs[blogSlug]

    if (!_blog || _blog.posts.length < 6) {
      this.setState({ requestedPosts: true })
      getPosts('blogs', blogSlug).then(() => {
        _blog = blog.byType.blogs[blogSlug]
        this.setState({ blog: _blog, requestedPosts: false })
      })
    } else {
      this.setState({ blog: _blog })
    }
  }

  render () {
    let _BlogView = !this.state.blog
      ? <Loader />
      : <BlogView blog={this.state.blog} />
    return this.props.children || _BlogView
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blog)
