import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import PostView from 'views/Blogs/Blog/Post'

export class Blog extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { post: {} }
  }

  componentWillMount () {
    let { postId } = this.props.params
    let post = this.props.blog.posts.find((post) => post.id === postId)
    this.setState({ post })
  }

  render () {
    return <PostView post={this.state.post} />
  }
}

let stateToProps = (state, props) => {
  let blog = state.blogs.byId[props.params.blogId]
  return { blog }
}

export default connect(stateToProps)(Blog)