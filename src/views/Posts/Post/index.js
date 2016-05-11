import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'
// components
import { Link } from 'react-router'

export class PostView extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  componentDidMount () {
    // show facebook comments
    window.FB.XFBML.parse()
  }

  render () {
    let { post } = this.props
    // TODO make conditional based on post date???
    let rallycasperRegex = /https?:\/\/(i\d+\.wp\.com\/)?rallycasper.com\/wp-content\/uploads/g
    let urlRegex = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    // replace domain
    post.content = post.content.replace(rallycasperRegex, 'https://rallyshoplocal.files.wordpress.com')
    // lowercase and change image resizing
    post.content = post.content.replace(urlRegex, (match) => {
      match = match.toLowerCase()
      let resize = match.match(/-\d+x\d+\.[0-9a-z]+$/i)
      if (resize) {
        resize = resize[0]
        let sizes = resize.match(/\d+/g)
        // remove sizing tacked onto end of file name
        match = match.replace(resize, resize.slice(resize.indexOf('.')))
        // append sizing as query param
        match += `?w=${sizes[0]}&h=${sizes[1]}`
      }
      return match
    })
    let url = 'http://d1fibhzlja0sk5.cloudfront.net/blogs/connie-lingus/runnerotica-the-alter-g-spot'
    return (
      <div className={`container-fluid ${styles.container}`}>
        <div className={'row center-xs middle-xs'}>
          <div className='row center-xs col-xs-12 col-lg-8'>
            <div className={styles.content}>
              <h1 className={styles.title}>{post.title}</h1>
              <h3 className={styles.subTitle}>
                <span style={{ fontSize: '1rem' }}>by </span>
                <Link to={`/${post._type}s/${post._category}`} >
                  {post.author.name}
                </Link>
              </h3>
              <div className='wordpress' dangerouslySetInnerHTML={{ __html: post.content }}></div>
              <div className='fb-comments' data-href={url} data-numposts='5'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostView
