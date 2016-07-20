import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// HOC
import Window from 'HOC/Window'
// utils
import moment from 'moment'

export class Post extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    window: PropTypes.object.isRequired
  }

  render () {
    let { onClick, post, size, window: { isTiny, isSmall, isMedium } } = this.props
    let featuredImage = `${post.featured_image}?resize=600%2C600`
    let el = document.createElement('div')
    el.innerHTML = post.excerpt // TODO grabbing image caption ... remove?
    let previewLengths = { small: 120, medium: 200, large: 350 }
    let length = isTiny || isSmall || isMedium ? previewLengths.small : previewLengths[size]
    let contentPreview = `${el.textContent.slice(0, length)}...`
    let cardImageStyle = { backgroundImage: `url('${featuredImage}')` }
    let author = post.author.name.split(' ')
    author = author.length > 1 ? `${author[0][0]}. ${author[1]}` : author.join(' ')

    return (
      <div className={styles[size]}>
        <div className={styles.card}>
          <div className={styles.target} onClick={onClick}></div>
          <div className={styles.image} style={cardImageStyle}></div>
          <div className={styles.overlay}></div>
          <div className={styles.content}>
            <div className={styles.title}>
              <span>{post.title}</span>
            </div>
            <div className={styles.preview}>
              <p><span>{contentPreview}</span></p>
            </div>
            <h6>{`${author} | ${moment(post.date).format('MMM D, YYYY')}`}</h6>
          </div>
        </div>
      </div>
    )
  }
}

export default Window(Post)
