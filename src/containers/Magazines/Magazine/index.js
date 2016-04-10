import React, { Component, PropTypes } from 'react'
import MagazineView from 'views/Magazines/Magazine'

export default class Magazine extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.onPageFlip = this.onPageFlip.bind(this)
    this.state = {
      currentPage: 0,
      left: undefined,
      right: '/images/rswinter/rswinter 1.jpeg'
    }
  }

  componentWillMount () {
    this.preloadImages(this.state.currentPage)
  }

  onPageFlip (direction) {
    let currentPage = this.state.currentPage + (direction === 'forward' ? 2 : -2)
    this.setState({
      currentPage: currentPage,
      left: `/images/rswinter/rswinter ${currentPage}.jpeg`,
      right: `/images/rswinter/rswinter ${currentPage + 1}.jpeg`
    })
    this.preloadImages(this.state.currentPage)
  }

  preloadImages (start) {
    for (let end = start + 4; end > start; end--) {
      let image = new Image()
      image.src = `/images/rswinter/rswinter ${end}.jpeg`
    }
  }

  render () {
    return (
      <MagazineView left={this.state.left} right={this.state.right} onPageFlip={this.onPageFlip} />
    )
  }
}
