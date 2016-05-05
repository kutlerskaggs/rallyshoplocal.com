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
    // TODO add loader below existing posts
    this.state = { posts: [], loading: false }
    // bind functions
    let funcs = ['checkIfMorePostsAvailable', 'filterPosts', 'loadPosts']
    funcs.forEach((fn) => { this[fn] = this[fn].bind(this) })
  }

  componentWillMount () {
    let { type, categorySlug } = this.props.params
    this.filterPosts(type, categorySlug)
  }

  componentWillReceiveProps (nextProps) {
    let { type, categorySlug } = this.props.params
    let { type: nextType, categorySlug: nextCategorySlug } = nextProps.params
    if (type !== nextType || categorySlug !== nextCategorySlug) {
      this.filterPosts(nextType, nextCategorySlug)
    }
  }

  checkIfMorePostsAvailable (type, categorySlug) {
    let moreAvailable
    let { byType } = this.props.posts
    if (categorySlug) {
      let { attributes, posts } = byType[type][categorySlug]
      moreAvailable = posts.length < attributes.post_count
    } else {
      let { _fetched, _post_count } = byType[type]
      moreAvailable = _fetched < _post_count
    }
    return moreAvailable
  }

  filterPosts (type, categorySlug) {
    let posts = []
    let categories = this.props.posts.byType[type]
    let getAllPosts = (categories) => {
      let _posts = []
      forOwn(categories, (category, key) => {
        // anything beginning with an underscore should be ignored
        if (key[0] !== '_') {
          _posts = _posts.concat(category.posts)
        }
      })
      return _posts
    }
    // get posts of category or for all categories, then sort
    posts = categorySlug ? categories[categorySlug].posts : getAllPosts(categories)
    posts = sortBy(posts, 'date').reverse()
    // if there are less than 6 matching posts load more, if available
    if (posts.length < 6 && this.checkIfMorePostsAvailable(type, categorySlug)) {
      this.loadPosts(type, categorySlug)
    } else {
      this.setState({ posts })
    }
  }

  loadPosts (type, categorySlug) {
    this.setState({ loading: true })
    this.props.getPosts(type, categorySlug).then(() => {
      this.setState({ loading: false })
      this.filterPosts(type, categorySlug)
    })
  }

  render () {
    let { posts } = this.state
    console.log('len', posts.length)
    let { categorySlug, type } = this.props.params
    let category = categorySlug
      ? this.props.posts.byType[type][categorySlug].attributes.name
      : undefined
    let loadPosts = () => this.loadPosts(type, categorySlug)

    return this.props.children ||
      <PostsView
        category={category}
        loadMore={loadPosts}
        posts={posts}
        type={type} />
  }
}

let stateToProps = (state) => {
  let { posts } = state
  return { posts }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Posts)
