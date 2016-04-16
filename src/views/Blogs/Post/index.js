import React, { Component, PropTypes } from 'react'
// css
import styles from './styles.scss'

export class PostView extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  }

  render () {
    let { post } = this.props
    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row center-xs col-xs-12 col-lg-8 ${styles.wrapper}`}>
            <div className={styles.content}>
              <h1 className={styles.title}>{post.title}</h1>
              <h3 className={styles.subTitle}>
                <span style={{ fontSize: '1rem' }}>by </span>
                {post.author.displayName}
              </h3>
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PostView
