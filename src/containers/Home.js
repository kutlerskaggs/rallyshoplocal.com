import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getBlogPosts } from 'redux/modules/actions/blogs'
// components
import HomeView from 'views/Home'
import Loader from 'components/Loader'
// utils
import { forOwn, sortBy } from 'lodash'

export class Home extends Component {

  static propTypes = {
    blogs: PropTypes.object,
    podcasts: PropTypes.object,
    getBlogPosts: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { content: [] }
  }

  componentWillMount () {
    let { getBlogPosts } = this.props
    let apiKey = 'AIzaSyA3zd8Vp7IDsWvkepT0h0fNKBkCFku58j0'
    let blogs = ['2901360073818541851', '4269772225470041486']
    // let podcasts = ['abc123', 'def456']
    // request blogs & podcasts
    let promises = [
      getBlogPosts(blogs, apiKey)
      // getPodcasts(podcasts, apiKey)
    ]
    // wait on blogs
    Promise.all(promises).then(() => {
      let { blogs } = this.props
      let content = []
      forOwn(blogs.byId, (blog) => {
        content = content.concat(blog.posts)
      })
      content = sortBy(content, 'published').reverse().slice(0, 6) // TODO update this, add podcasts
      this.setState({ content: content.map((post) => ({ post, type: 'blog' })) })
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
  let { blogs, podcasts } = state
  return {
    blogs,
    podcasts
  }
}

let dispatchToProps = {
  getBlogPosts
}

export default connect(stateToProps, dispatchToProps)(Home)
