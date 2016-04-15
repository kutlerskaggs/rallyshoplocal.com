import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// HOC
import Window from 'HOC/Window'

export class Post extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
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
    let { content, imgSrc, onClick, post, type } = this.props
    let showRevealStyle = {
      transform: 'translate3d(0, 0, 0)'
    }
    function truncate (text) {
      return `${text.slice(0, 150)}...`
    }

    return (
      <div key={post.id} className='col-xs-12 col-lg-6'>
        <div className={styles.cardWrapper} onClick={this.onClick}>
          <div className={styles.card}>
            <div className={styles.cardImage} style={{backgroundImage: `url('${imgSrc}')`}}></div>
            <div className={styles.cardContent}>
              <div className={styles.title}>
                <h1>{post.title}</h1>
              </div>
              <div className={styles.reveal} style={this.state.reveal ? showRevealStyle : {}}>
                <p>{truncate(content)}</p>
                <a className={styles.more} onClick={onClick}>Read more</a>
              </div>
              <i className={`fa fa-${type === 'blogs' ? 'pencil' : 'microphone'} fa-fw ${styles.icon}`}></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Window(Post)
