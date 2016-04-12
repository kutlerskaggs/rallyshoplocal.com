import React, { Component, PropTypes } from 'react'
import MagazineView from 'views/Magazines/Magazine'

export default class Magazine extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.preloadImages = this.preloadImages.bind(this)
    this.state = { maxPage: 0, pageCount: 70 }
  }

  componentWillMount () {
    this.preloadImages(this.state.maxPage)
  }

  preloadImages (pageNumber) {
    let { maxPage, pageCount } = this.state
    maxPage++
    if (pageNumber > pageCount && pageNumber > maxPage) {
      // load up to 4 new pages
      let newMaxPage = Math.min(maxPage + 4, pageCount)
      this.preloadImages(newMaxPage)
      for (maxPage; maxPage <= newMaxPage; maxPage++) {
        let image = new Image()
        image.src = `/images/rswinter/rswinter ${maxPage}.jpeg`
      }
      this.setState({ maxPage: newMaxPage })
    }
  }

  render () {
    return (
      <MagazineView onPageFlip={this.preloadImages} pageCount={this.state.pageCount} />
    )
  }
}
