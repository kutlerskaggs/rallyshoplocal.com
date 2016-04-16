import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import PostView from 'views/Blogs/Blog/Post'

export class Post extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { post: {} }
  }

  componentWillMount () {
    // TODO fetch if not found, need to implement getPost first
    let { postSlug } = this.props.params
    let post = this.props.blog.posts.find((post) => post.slug === postSlug)
    this.setState({ post })
  }

  render () {
    return <PostView post={this.state.post} />
  }
}

let stateToProps = (state, props) => {
  let blog = state.blog.byType.blogs[props.params.blogSlug]
  return { blog }
}

export default connect(stateToProps)(Post)
