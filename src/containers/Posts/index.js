import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/posts'
// components
import PostsView from 'views/Posts'
// utils
import { forOwn, sortBy } from 'lodash'

export class Posts extends Component {

  static propTypes = {
    posts: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { posts: [], moreAvailable: true }
    this.concatPosts = this.concatPosts.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
    this.checkIfMorePostsAvailable = this.checkIfMorePostsAvailable.bind(this)
  }

  componentWillMount () {
    let { categorySlug } = this.props.params
    let nextState = this.concatPosts(categorySlug)
    let moreAvailable = this.checkIfMorePostsAvailable(categorySlug)
    if (nextState.posts.length < 6 && moreAvailable) {
      this.loadPosts(categorySlug)
    }
  }

  componentWillReceiveProps (nextProps) {
    let { categorySlug } = this.props.params
    let { categorySlug: nextCategorySlug } = nextProps.params
    // if !categorySlug componentWillMount will be called
    if (categorySlug && categorySlug !== nextCategorySlug) {
      let nextState = this.concatPosts(nextCategorySlug)
      let moreAvailable = this.checkIfMorePostsAvailable(nextCategorySlug)
      if (nextState.posts.length < 6 && moreAvailable) {
        this.loadPosts(nextCategorySlug)
      }
    }
  }

  checkIfMorePostsAvailable (categorySlug) {
    let moreAvailable
    let { posts: { byType }, params: { type } } = this.props
    if (categorySlug) {
      let { attributes, posts } = byType[type][categorySlug]
      moreAvailable = posts.length < attributes.post_count
    } else {
      let { _fetched, _post_count } = byType[type]
      moreAvailable = _fetched < _post_count
    }
    this.setState({ moreAvailable })
    return moreAvailable
  }

  concatPosts (categorySlug) {
    let state = { posts: [] }
    let { type } = this.props.params
    this.checkIfMorePostsAvailable(categorySlug)
    forOwn(this.props.posts.byType[type], (category) => {
      // ignore props
      if (category.posts) {
        if (!categorySlug || category.attributes.slug === categorySlug) {
          state.posts = state.posts.concat(category.posts)
        }
      }
    })
    state.posts = sortBy(state.posts, 'date').reverse()
    this.setState(state)
    return state
  }

  loadPosts (categorySlug) {
    let { getPosts, params: { type } } = this.props
    getPosts(type, categorySlug).then(() => this.concatPosts(categorySlug))
  }

  render () {
    let { moreAvailable, posts } = this.state
    let { categorySlug, type } = this.props.params
    let loadPosts = () => this.loadPosts(categorySlug)

    return this.props.children ||
      <PostsView
        activeCategory={categorySlug}
        posts={posts}
        type={type}
        loadMore={loadPosts}
        moreAvailable={moreAvailable} />
  }
}

let stateToProps = (state) => {
  let { posts } = state
  return { posts }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Posts)
