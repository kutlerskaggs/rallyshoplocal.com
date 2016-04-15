import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'
// components
import Post from 'components/Post'

export default class HomeView extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    posts: PropTypes.array.isRequired
  }

  render () {
    let { posts } = this.props

    let _posts = posts.map((post) => {
      let { _category, _type, content, featured_image, ID: id, slug } = post
      let onClick = () => this.context.router.push(`/${_type}s/${_category}/${slug}`)
      let el = document.createElement('div')
      el.innerHTML = content
      let preview = el.textContent.slice(0, 500)
      return (
        <Post
          key={id}
          content={preview}
          imgSrc={featured_image}
          onClick={onClick}
          post={post} />
      )
    })

    return (
      <div className='container-fluid'>
        <div className={'row center-xs middle-xs'}>
          <div className={`row col-xs-12 col-lg-10 ${styles.cardContainer}`}>
            {_posts}
          </div>
        </div>
      </div>
    )
  }
}
