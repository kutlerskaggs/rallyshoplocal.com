import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import PodcastsView from 'views/Podcasts'
// utils
import { forOwn, sortBy } from 'lodash'

export class Podcasts extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { podcasts: [], moreAvailable: true, posts: [] }
    this.concatPosts = this.concatPosts.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
    this.checkIfMorePostsAvailable = this.checkIfMorePostsAvailable.bind(this)
  }

  componentWillMount () {
    let { podcastSlug } = this.props.params
    let nextState = this.concatPosts(podcastSlug)
    let moreAvailable = this.checkIfMorePostsAvailable(podcastSlug)
    if (nextState.posts.length < 6 && moreAvailable) {
      this.loadPosts(podcastSlug)
    }
  }

  componentWillReceiveProps (nextProps) {
    let { podcastSlug } = this.props.params
    let { podcastSlug: nextPodcastSlug } = nextProps.params
    // if !podcastSlug componentWillMount will be called
    if (podcastSlug && podcastSlug !== nextPodcastSlug) {
      let nextState = this.concatPosts(nextPodcastSlug)
      let moreAvailable = this.checkIfMorePostsAvailable(nextPodcastSlug)
      if (nextState.posts.length < 6 && moreAvailable) {
        this.loadPosts(nextPodcastSlug)
      }
    }
  }

  checkIfMorePostsAvailable (podcastSlug) {
    let moreAvailable
    let { byType } = this.props.blog
    if (podcastSlug) {
      let { attributes, posts } = byType.podcasts[podcastSlug]
      moreAvailable = posts.length < attributes.post_count
    } else {
      let { _fetched, _post_count } = byType.podcasts
      moreAvailable = _fetched < _post_count
    }
    this.setState({ moreAvailable })
    return moreAvailable
  }

  concatPosts (podcastSlug) {
    let state = { podcasts: [], posts: [] }
    forOwn(this.props.blog.byType.podcasts, (category) => {
      // ignore props
      if (category.posts) {
        state.podcasts.push(category.attributes)
        if (!podcastSlug || category.attributes.slug === podcastSlug) {
          state.posts = state.posts.concat(category.posts)
        }
      }
    })
    state.posts = sortBy(state.posts, 'date').reverse()
    this.setState(state)
    return state
  }

  loadPosts (podcastSlug) {
    let { getPosts } = this.props
    // podcastSlug = podcastSlug || params.podcastSlug
    getPosts('podcasts', podcastSlug).then(() => this.concatPosts(podcastSlug))
  }

  render () {
    let { podcasts, moreAvailable, posts } = this.state
    let { podcastSlug } = this.props.params

    return this.props.children ||
      <PodcastsView
        activePodcast={podcastSlug}
        podcasts={podcasts}
        posts={posts}
        loadMore={this.loadPosts}
        moreAvailable={moreAvailable} />
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Podcasts)
