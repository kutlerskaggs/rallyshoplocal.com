import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
// components
import Post from 'components/Post'

export default class HomeView extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    content: PropTypes.array.isRequired
  }

  render () {
    let { content } = this.props

    let _content = content.map((item) => {
      let { post, type } = item
      let onClick = () => this.context.router.push(`/${type}s/${post.blog.id}/${post.id}`)
      let el = document.createElement('div')
      el.innerHTML = post.content
      let image = el.getElementsByTagName('img')[0]
      // get biggest image available up to 600px wide
      let imgSrc = image.src.replace(/\/s[0-9]+\//, '/w600/')
      let preview = el.textContent.slice(0, 500)
      return (
        <Post key={post.id} content={preview} imgSrc={imgSrc} post={post} type={type} onClick={onClick} />
      )
    })

    return (
      <div>
        <div className={styles.splashContent}>
          <div className='container-fluid'>
            <div className={'row center-xs middle-xs'}>
              <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
                {_content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
