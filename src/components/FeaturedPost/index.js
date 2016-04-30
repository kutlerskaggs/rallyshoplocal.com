import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// HOC
import Window from 'HOC/Window'

export class FeaturedPost extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    position: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    window: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    // for use on mobile and tablet only
    this.state = { reveal: false }
    this.onClick = this.onClick.bind(this)
  }

  onClick (id) {
    let { onClick, window } = this.props
    if (window.isTablet || window.isMobile) {
      this.setState({ reveal: !this.state.reveal })
    } else {
      onClick()
    }
  }

  render () {
    let { onClick, position, post } = this.props
    let featuredImage = `${post.featured_image}?resize=600%2C600`
    let el = document.createElement('div')
    el.innerHTML = post.excerpt // TODO grabbing image caption ... remove?
    let contentPreview = `${el.textContent.slice(0, 150)}...`
    let cardImageStyle = { backgroundImage: `url('${featuredImage}')` }
    let showRevealStyle = { transform: 'translate3d(0, 0, 0)' }

    // TODO split title, concat into multiple headers
    let title = post.title.split(' ').reduce((word) => {

    })

    return (
      <div className={`${styles.wrapper} ${styles[position]}`} onClick={this.onClick}>
        <div className={styles.skew}>
          <div className={styles.unskew}>
            <div className={styles.image} style={cardImageStyle}></div>
            <div className={styles.overlay}></div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.reveal} style={this.state.reveal ? showRevealStyle : {}}>
            <p><span>{contentPreview}</span></p>
            <a className={styles.more} onClick={onClick}>
              Read more
              <i className='fa fa-sign-in fa-fw'></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Window(FeaturedPost)
