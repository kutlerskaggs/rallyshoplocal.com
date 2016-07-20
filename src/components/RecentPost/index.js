import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// utils
import moment from 'moment'

export class FeaturedPost extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  }

  render () {
    let { onClick, post } = this.props
    let featuredImage = `${post.featured_image}?resize=350%2C350`
    let el = document.createElement('div')
    el.innerHTML = post.excerpt
    let contentPreview = `${el.textContent.slice(0, 100)}...`
    let cardImageStyle = { backgroundImage: `url('${featuredImage}')` }
    let author = post.author.name.split(' ')
    author = author.length > 1 ? `${author[0][0]}. ${author[1]}` : author.join(' ')

    return (
      <div className={`${styles.wrapper}`}>
        <div className={styles.content} onClick={onClick}>
          <div className={styles.image} style={cardImageStyle}></div>
          <div className={styles.innerContent}>
            <h4>{post.title}</h4>
            <p>{contentPreview}</p>
            <h6>{`${author} | ${moment(post.date).format('MMM D, YYYY')}`}</h6>
          </div>
        </div>
      </div>
    )
  }
}

export default FeaturedPost
