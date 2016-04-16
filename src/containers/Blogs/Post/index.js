import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPost } from 'redux/modules/actions/blog'
// components
import Loader from 'components/Loader'
import PostView from 'views/Blogs/Post'

export class Post extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { post: undefined }
  }

  componentWillMount () {
    console.log('mounting...')
    // TODO fetch if not found, need to implement getPost first
    let { blog, getPost, params: { postSlug } } = this.props
    let post = blog.posts.find((post) => post.slug === postSlug)
    if (!post) {
      getPost(postSlug).then(() => {
        post = blog.posts.find((post) => post.slug === postSlug)
        this.setState({ post })
      })
    } else {
      this.setState({ post })
    }
  }

  render () {
    let { post } = this.state
    return post ? <PostView post={this.state.post} /> : <Loader />
  }
}

let stateToProps = (state, props) => {
  let blog = state.blog.byType.blogs[props.params.blogSlug]
  return { blog }
}

let dispatchToProps = { getPost }

export default connect(stateToProps, dispatchToProps)(Post)
