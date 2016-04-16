import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
// components
import HomeView from 'views/Home'
// utils
import { forOwn, sortBy } from 'lodash'

export class Home extends Component {

  static propTypes = {
    blog: PropTypes.object,
    podcasts: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { posts: [] }
  }

  componentWillMount () {
    let posts = []
    forOwn(this.props.blog.byType, (categories, type) => {
      forOwn(categories, (category, name) => {
        // ignore category props
        if (category.posts) {
          posts = posts.concat(category.posts)
        }
      })
    })
    // combining blogs and posts so sorting is necessary
    posts = sortBy(posts, (post) => post.date).reverse().slice(0, 6)
    this.setState({ posts: posts })
  }

  render () {
    return <HomeView posts={this.state.posts} />
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

export default connect(stateToProps)(Home)
