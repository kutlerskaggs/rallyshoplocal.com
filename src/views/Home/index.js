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
      let { category, post, type } = item
      let onClick = () => this.context.router.push(`/${type}/${category}/${post.slug}`)
      let el = document.createElement('div')
      el.innerHTML = post.content
      let preview = el.textContent.slice(0, 500)
      return (
        <Post
          key={post.ID}
          content={preview}
          imgSrc={post['featured_image']}
          onClick={onClick}
          post={post}
          type={type} />
      )
    })

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
            {_content}
          </div>
        </div>
      </div>
    )
  }
}
