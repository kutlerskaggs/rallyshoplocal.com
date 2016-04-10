import React, { Component, PropTypes } from 'react'
import MagazinesView from 'views/Magazines'

export default class Magazines extends Component {

  static propTypes = {
    children: PropTypes.element
  }

  render () {
    return this.props.children || <MagazinesView />
  }
}
