import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import HomeView from 'views/Home'
import Loader from 'components/Loader'
// utils
import { forOwn, sortBy } from 'lodash'

export class Home extends Component {

  static propTypes = {
    blog: PropTypes.object,
    podcasts: PropTypes.object,
    getPosts: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { posts: [] }
  }

  componentWillMount () {
    let { blog, getPosts } = this.props
    let posts = []
    // request blogs & podcasts
    getPosts().then(() => {
      let types = blog.byType
      forOwn(types, (categories, type) => {
        forOwn(categories, (category, name) => {
          posts = posts.concat(category.posts)
        })
      })
      // combining blogs and posts so sorting is necessary
      posts = sortBy(posts, (post) => post.date).reverse().slice(0, 6)
      this.setState({ posts: posts })
    })
  }

  render () {
    return this.props.blog.loading
      ? <Loader />
      : <HomeView posts={this.state.posts} />
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = {
  getPosts
}

export default connect(stateToProps, dispatchToProps)(Home)
