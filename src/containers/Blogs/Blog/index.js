import React, { Component, PropTypes } from 'react'
// redux
import { connect } from 'react-redux'
import BlogView from 'views/Blogs/Blog'

export class Blog extends Component {

  static propTypes = {
    blogs: PropTypes.object.isRequired,
    children: PropTypes.element,
    params: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { blog: undefined }
  }

  componentWillMount () {
    // TODO getBlogs() if none in store
    let { blogId } = this.props.params
    let blog = this.props.blogs.byId[blogId]
    this.setState({ blog })
  }

  render () {
    return this.props.children || <BlogView blog={this.state.blog} />
  }
}

let stateToProps = (state) => {
  let { blogs } = state
  return { blogs }
}

export default connect(stateToProps)(Blog)
