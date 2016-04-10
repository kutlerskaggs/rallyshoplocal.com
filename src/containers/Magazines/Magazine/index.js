import React, { Component, PropTypes } from 'react'
import MagazineView from 'views/Magazines/Magazine'

export default class Magazine extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      left: '/images/rswinter/rswinter 1.jpeg',
      right: '/images/rswinter/rswinter 2.jpeg'
    }
  }

  render () {
    return (
      <MagazineView left={this.state.left} right={this.state.right} />
    )
  }
}
