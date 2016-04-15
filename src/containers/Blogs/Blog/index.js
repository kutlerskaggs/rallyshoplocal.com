import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import { getPosts } from 'redux/modules/actions/blog'
// components
import BlogView from 'views/Blogs/Blog'
import Loader from 'components/Loader'

export class Blog extends Component {

  static propTypes = {
    blog: PropTypes.object.isRequired,
    children: PropTypes.element,
    getPosts: PropTypes.func.isRequired,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { blog: undefined }
  }

  componentWillMount () {
    let { blog, getPosts, params: { blogSlug } } = this.props
    let _blog = blog.byType.blogs[blogSlug]
    console.log(blog.loading)
    if (!blog.loading) {
      if (!_blog || _blog.posts.length < 6) {
        console.log('in here')
        getPosts('blogs', blogSlug).then(() => {
          _blog = blog.byType.blogs[blogSlug]
          this.setState({ blog: _blog })
        })
      } else {
        this.setState({ blog: _blog })
      }
    }
  }

  render () {
    let _BlogView = !this.state.blog
      ? <Loader />
      : <BlogView blog={this.state.blog} />
    return this.props.children || _BlogView
  }
}

let stateToProps = (state) => {
  let { blog } = state
  return { blog }
}

let dispatchToProps = { getPosts }

export default connect(stateToProps, dispatchToProps)(Blog)
