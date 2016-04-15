import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blogs'
// components
import BlogsView from 'views/Blogs'
import Loader from 'components/Loader'
// utils
import { forOwn, sortBy } from 'lodash'

export class Blogs extends Component {

  static propTypes = {
    blogs: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { blogs: [], featuredPosts: [] }
  }

  componentWillMount () {
    // TODO update with getPosts()
    /* this.props.getBlogPosts().then(() => {
      let blogs = []
      let featuredPosts = []
      forOwn(this.props.blogs.byId, (blog) => {
        blogs.push(blog)
        featuredPosts = featuredPosts.concat(blog.posts)
      })
      featuredPosts = sortBy(featuredPosts, 'published').reverse().slice(0, 2)
      this.setState({ blogs, featuredPosts })
    }) */
  }

  render () {
    let { blogs, featuredPosts } = this.state
    let _BlogsView = this.props.blogs.loading
      ? <Loader />
      : <BlogsView blogs={blogs} featuredPosts={featuredPosts} />
    return (
      this.props.children || _BlogsView
    )
  }
}

let stateToProps = (state) => {
  let { blogs } = state
  return { blogs }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blogs)
