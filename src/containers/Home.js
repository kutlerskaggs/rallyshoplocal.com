import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blogs'
// components
import HomeView from 'views/Home'
import Loader from 'components/Loader'
// utils
import { forOwn, sortBy } from 'lodash'

export class Home extends Component {

  static propTypes = {
    blogs: PropTypes.object,
    podcasts: PropTypes.object,
    getPosts: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { content: [] }
  }

  componentWillMount () {
    let { getPosts } = this.props
    let posts = []
    // request blogs & podcasts
    getPosts().then(() => {
      let categories = this.props.blogs.byCategory
      forOwn(categories, (category, type) => {
        forOwn(category, (item, itemName) => {
          posts = posts.concat(item.posts.map((post) => ({ category: itemName, post, type })))
        })
      })
      posts = sortBy(posts, (post) => post.date).slice(0, 6)
      this.setState({ content: posts })
    })
  }

  render () {
    let { blogs } = this.props
    return blogs.loading // || podcasts.loading
      ? <Loader />
      : <HomeView content={this.state.content} />
  }
}

let stateToProps = (state) => {
  let { blogs } = state
  return { blogs }
}

let dispatchToProps = {
  getPosts
}

export default connect(stateToProps, dispatchToProps)(Home)
