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
    this.state = { featuredPosts: [] }
  }

  componentWillMount () {
    // TODO getBlogs() if none in store
    let featuredPosts = []
    forOwn(this.props.blogs.byId, (blog) => {
      featuredPosts = featuredPosts.concat(blog.posts)
    })
    featuredPosts = sortBy(featuredPosts, 'published').reverse().slice(0, 2)
    this.setState({ featuredPosts })
  }

  render () {
    return (
      this.props.children || <BlogsView featuredPosts={this.state.featuredPosts} />
    )
  }
}

let stateToProps = (state) => {
  let { blogs } = state
  return { blogs }
}

export default connect(stateToProps)(Blogs)
