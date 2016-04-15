import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import BlogsView from 'views/Blogs'
import Loader from 'components/Loader'
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
    this.state = {
      blogs: [],
      featuredPosts: [],
      requestedPosts: false
    }
    this.getBlogsAndPostsIfNeeded = this.getBlogsAndPostsIfNeeded.bind(this)
  }

  componentWillMount () {
    if (!this.props.params.blogSlug) {
      this.getBlogsAndPostsIfNeeded()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!nextProps.params.blogSlug && !this.state.requestedPosts) {
      this.getBlogsAndPostsIfNeeded()
    }
  }

  getBlogsAndPostsIfNeeded () {
    // return
    let featuredPosts
    let getFeaturedPosts = () => {
      featuredPosts = []
      let blogs = []
      forOwn(this.props.blog.byType.blogs, (category) => {
        blogs.push(category.attributes)
        featuredPosts = featuredPosts.concat(category.posts)
      })
      if (featuredPosts.length >= 2) {
        // TODO change to 3 with new cards
        // TODO change to 3 with new cards
        featuredPosts = sortBy(featuredPosts, 'date').reverse().slice(0, 2)
        let state = { blogs, featuredPosts }
        this.setState(state)
      }
    }

    getFeaturedPosts()
    if (featuredPosts.length < 2) {
      this.setState({ requestedPosts: true })
      this.props.getPosts('blogs').then(getFeaturedPosts)
    }
  }

  render () {
    let { blogs, featuredPosts } = this.state
    let _BlogsView = this.props.blog.loading
      ? <Loader />
      : <BlogsView blogs={blogs} featuredPosts={featuredPosts} />
    return (
      this.props.children || _BlogsView
    )
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blogs)
