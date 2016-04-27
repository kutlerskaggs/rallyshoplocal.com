import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPost } from 'redux/modules/actions/blog'
// components
import Loader from 'components/Loader'
import PostView from 'views/Podcasts/Post'

export class Post extends Component {

  static propTypes = {
    podcast: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { post: undefined }
  }

  componentWillMount () {
    let { podcast, getPost, params: { postSlug } } = this.props
    let post = podcast.posts.find((post) => post.slug === postSlug)
    if (!post) {
      getPost(postSlug).then(() => {
        post = podcast.posts.find((post) => post.slug === postSlug)
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
  let podcast = state.blog.byType.podcasts[props.params.podcastSlug]
  return { podcast }
}

let dispatchToProps = { getPost }

export default connect(stateToProps, dispatchToProps)(Post)
