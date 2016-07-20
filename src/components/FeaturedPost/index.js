import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// utils
import moment from 'moment'

export class FeaturedPost extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    position: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired
  }

  render () {
    let { onClick, position, post } = this.props
    let featuredImage = `${post.featured_image}?resize=600%2C600`
    let el = document.createElement('div')
    el.innerHTML = post.excerpt
    let contentPreview = `${el.textContent.slice(0, 200)}...`
    let cardImageStyle = { backgroundImage: `url('${featuredImage}')` }

    // split title, concat into multiple headers
    let title = post.title.split(' ').reduce((output, word) => {
      let lines = output.length
      let currentLine = output[lines - 1]
      if ((currentLine.length + word.length) < 15) {
        currentLine += currentLine.length ? ` ${word}` : word
        output[lines - 1] = currentLine
      } else {
        output.push(word)
      }
      return output
    }, [''])

    let _title = title.map((line, index) => <h3 key={index}>{line}</h3>)
    let author = post.author.name.split(' ')
    author = author.length > 1 ? `${author[0][0]}. ${author[1]}` : author.join(' ')

    return (
      <div className={`${styles.wrapper} ${styles[position]}`} onClick={onClick}>
        <div className={styles.skew}>
          <div className={styles.unskew}>
            <div className={styles.image} style={cardImageStyle}></div>
            <div className={styles.overlay}></div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.cover}>
            <div>
              {_title}
            </div>
            <h6>{`${author} | ${moment(post.date).format('MMM D, YYYY')}`}</h6>
          </div>
          <div className={styles.preview}>
            <div>
              <p><span>{contentPreview}</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeaturedPost
