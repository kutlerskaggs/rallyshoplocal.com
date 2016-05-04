import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPost } from 'redux/modules/actions/posts'
// components
import Loader from 'components/Loader'
import PostView from 'views/Posts/Post'

export class Post extends Component {

  static propTypes = {
    category: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { post: undefined }
  }

  componentWillMount () {
    let { category, getPost, params: { postSlug } } = this.props
    let post = category.posts.find((post) => post.slug === postSlug)
    if (!post) {
      getPost(postSlug).then(() => {
        post = category.posts.find((post) => post.slug === postSlug)
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
  let { categorySlug, type } = props.params
  let category = state.posts.byType[type][categorySlug]
  return { category }
}

let dispatchToProps = { getPost }

export default connect(stateToProps, dispatchToProps)(Post)
