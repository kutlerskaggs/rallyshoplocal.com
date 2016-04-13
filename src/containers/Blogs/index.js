import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import BlogsView from 'views/Blogs'
// utils
import { forOwn, sortBy } from 'lodash'

export class Blogs extends Component {

  static propTypes = {
    blogs: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  constructor (props) {
    super(props)
    this.state = { blogs: [], featuredPosts: [] }
  }

  componentWillMount () {
    // TODO getBlogs() if none in store
    let blogs = []
    let featuredPosts = []
    forOwn(this.props.blogs.byId, (blog) => {
      blogs.push(blog)
      featuredPosts = featuredPosts.concat(blog.posts)
    })
    featuredPosts = sortBy(featuredPosts, 'published').reverse().slice(0, 2)
    this.setState({ blogs, featuredPosts })
  }

  render () {
    let { blogs, featuredPosts } = this.state
    return (
      this.props.children || <BlogsView blogs={blogs} featuredPosts={featuredPosts} />
    )
  }
}

let stateToProps = (state) => {
  let { blogs } = state
  return { blogs }
}

export default connect(stateToProps)(Blogs)
