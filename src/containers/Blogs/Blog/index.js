import React, { Component, PropTypes } from 'react'
import BlogView from 'views/Blogs/Blog'

export default class Blog extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return this.props.children || <BlogView />
  }
}
